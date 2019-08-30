require("dotenv").config();

var axios = require("axios");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

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
                showSongInfo("All the Small Things");
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
    .then(function (err, response) {
        console.log(response.data);
        if (err) {
            console.log("ERROR");
        }else {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log("-------------CONCERT INFO-------------");
                fs.appendFileSync("log.txt", "-------------CONCERT INFO-------------");

                console.log(i);
                fs.appendFileSync("log.txt", i+"\n");

                console.log("Name of the Venue: " + concerts[i].venue.name);
                fs.appendFileSync("log.txt", "Name of the Venue: " + concerts[i].venue.name);

                console.log("Venue Location: " + concerts[i].venue.name + "," + concerts[i].venue.region);
                fs.appendFileSync("log.txt", "Venue Location: " + "concerts[i].venue.city" + "," + concerts[i].venue.region);

                // FORMAT WITH MOMENT
                console.log("Date of Event: " + concerts[i].datetime);
                fs.appendFileSync("log.txt", "Date of Event: " + concerts[i].datetime);
            }
        }
    }) 
    
}

// SPOTIFY - USED FOR SONG INFO
function showSongInfo(searchTerm) {

}

// OMDB - USED FOR MOVIE INFO
function showMovieInfo(searchTerm) {

}

// DEFAULT SEARCH WITH PARAMETERS FROM random.txt