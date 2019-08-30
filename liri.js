require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
// var Spotify = require("note-spotify-api");
// var spotify = new Spotify(keys.spotify);
var moment = require("moment");
moment().format("MMM Do YY");

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
                showMovieInfo("The Nun");
            }
            break;
        case "do-what-it-says":
            showRandomTxtInfo();
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
                

                console.log("-------------CONCERT INFO-------------");
                fs.appendFileSync("log.txt", "-------------CONCERT INFO-------------");


                var concertInfo = 
                    "\nName of Venue: " + response.data[i].venue.name +
                    "\nVenue Location: " + response.data[i].venue.city + "," + response.data[i].venue.region +
                    "\nDate of the Event: " + moment(dateArray[0], "MMM Do YY");
                    // "\nDate of the Event: " + response.data[i].datetime;
                console.log(concertInfo);
                fs.appendFileSync("log.txt", concertInfo);
            
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
            
            console.log("-------------CONCERT INFO-------------");
                fs.appendFileSync("log.txt", "-------------CONCERT INFO-------------");

            var spotifyInfo = 
                "\nArtist(s): " + response.tracks.items[i].artists[0].name +
                "\nSong Name: " + response.tracks.items[i].name +
                "\nAlbum Name: " + response.tracks.items[i].album.name +
                "\nPreview Link: " + response.tracks.items[i].preview_url;
                console.log(spotifyInfo);
        }
    }).catch(function(err) {
        console.log(err);
    })

}

// OMDB - USED FOR MOVIE INFO
// function showMovieInfo(searchTerm) {

// }

// DEFAULT SEARCH WITH PARAMETERS FROM random.txt