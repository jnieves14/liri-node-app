require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var searchType = process.argv[2];
var searchTerm = process.argv[3];

userSearch(searchType, searchTerm);

function userSearch(searchType, searchTerm) {
    switch (searchType) {
        case "concert-this":
            showConcertInfo(searchTerm);
            break;
        case "spotify-this-song":
            showSongInfo(searchTerm);
            break;
        case "movie-this":
            showMovieInfo(searchTerm);
            break;
        case "do-what-it-says":
            showRandomTxtInfo();
            break;
        default: 
            console.log("You have entered an incorrect search type. Please choose from one of the following: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
    }
}

// BANDS IN TOWN - USED FOR CONCERT INFO

// SPOTIFY - USED FOR SONG INFO

// OMDB - USED FOR MOVIE INFO