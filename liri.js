require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
moment().format();

var searchType = process.argv[2];
var searchTerm = process.argv[3];

userSearch(searchType, searchTerm);

function userSearch(searchType, searchTerm) {
    switch (searchType) {
        case "concert-this":
            if (searchTerm) {
                showConcertInfo(searchTerm);
            }else {
                showConcertInfo("ONE OK ROCK");
            }
            break;
        case "spotify-this-song":
            if (searchTerm) {
                showSongInfo(searchTerm);
            }else {
                showSongInfo("The Sign");
            }
            break;
        case "movie-this":
            if (searchTerm) {
            showMovieInfo(searchTerm);
            }else {
                showMovieInfo("Mr. Nobody");
            }
            break;
        case "do-what-it-says":
            showRandomTxtInfo(searchTerm);
            break;
        default: 
            console.log("You have entered an incorrect search type. Please choose from one of the following: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
    }
}

// BANDS IN TOWN - USED FOR CONCERT INFO
function showConcertInfo(searchTerm) {
    axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
    .then(function (response) {
        // console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                var datetime = response.data[i].datetime;
                var dateArray = datetime.split("T");


                var concertInfo = 
                    "\n-------------CONCERT INFO-------------" +
                    "\nName of Venue: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city + "," + response.data[i].venue.region +
                    "\nDate of the Event: " + moment(dateArray[0], "MM-DD-YYYY");
                    // "\nDate of the Event: " + response.data[i].datetime;
                console.log(concertInfo);
                fs.appendFileSync("log.txt", concertInfo);
            

                // ORIGINAL CODE
                // console.log(i);
                // fs.appendFileSync("log.txt", i+"\n");

                // console.log("Name of the Venue: " + response.data[i].venue.name);
                // fs.appendFileSync("log.txt", "Name of the Venue: " + response.data[i].venue.name);

                // console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                // fs.appendFileSync("log.txt", "Venue Location: " + "response.data[i].venue.city" + ", " + response.data[i].venue.region);

                // FORMAT WITH MOMENT
                // console.log("Date of Event: " + moment(dateArr[0], "MM-DD-YYYY"));
                // fs.appendFileSync("log.txt", "Date of Event: " + moment(dateArr[0], "MM-DD-YYYY"));
            }
        }).catch(function(err) {
            console.log(err);
        });
}

// SPOTIFY - USED FOR SONG INFO
function showSongInfo(searchTerm) {
    spotify.search({ 
        type: "track", 
        query: searchTerm 
    }).then(function(response) {
        for (var i = 0; i < 5; i++) {
            
            console.log("\n-------------SPOTIFY INFO-------------");
                fs.appendFileSync("log.txt", "\n-------------SPOTIFY INFO-------------");

            var spotifyInfo = 
                "\nArtist(s): " + response.tracks.items[i].artists[0].name +
                "\nSong Name: " + response.tracks.items[i].name +
                "\nAlbum Name: " + response.tracks.items[i].album.name +
                "\nPreview Link: " + response.tracks.items[i].preview_url;
                console.log(spotifyInfo);
                fs.appendFileSync("log.txt", spotifyInfo);
        }
    }).catch(function(err) {
        console.log(err);
    })

}

// OMDB - USED FOR MOVIE INFO
function showMovieInfo(searchTerm) {
    axios.get("https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        console.log("\n------------- MOVIE INFO-------------");
        fs.appendFileSync("log.txt", "\n-------------MOVIE INFO-------------");

        var movieInfo = 
            "\nTitle of the Movie: " + response.data.Title +
            "\nYear the Movie Came out: " + response.data.Year +
            "\nIMDB Rating of the Movie: " + response.data.Ratings[0].Value +
            "\nRotten Tomatoes Rating of the Movie: " + response.data.Ratings[1].Value +
            "\nCountry Where the Movie was Produced: " + response.data.Country +
            "\nLanguage of the Movie: " + response.data.Language +
            "\nPlot of the Movie: " + response.data.Plot +
            "\nActors of the Movie: " + response.data.Actors;                console.log(movieInfo);
            fs.appendFileSync("log.txt", movieInfo);
    }).catch(function(err) {
        console.log(err);
    })
}

// DEFAULT SEARCH WITH PARAMETERS FROM random.txt
function showRandomTxtInfo(searchTerm) {
    fs.readFile("random.txt", "utf8", function(err, data) {
        console.log("\n-------------DO WHAT IT SAYS-------------");
                fs.appendFileSync("log.txt", "\n-------------DO WHAT IT SAYS-------------");

        if (err) {
            return console.log(err);
        }else {
            var data = data.split(",");
            showSongInfo(data[1]);
        }
    })
}