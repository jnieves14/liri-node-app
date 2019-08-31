# liri-node-app

## Overview
" LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data."

## Instructions
liri.js can take in one of the following commands:
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says
<p>
If using one of the first three commands, users may add a search term for example:
<p>
* concert-this *artist name*
* spotify-this-song *song name*
* movie-this *movie name*
Type do-what-it-says with no search term tp see what happens!

## Link
[Link to the Live Site](https://jnieves14.github.io/liri-node-app/)

## Preview
You can use commands like:
* concert-this: use the BandsInTown API to find concerts from your favorite artists
* spotify-this-song: use the Spotify API to search information about your favorite song
* movie-this: use the OMDB API to gather information on any (should I say most) movie
* do-what-it-says: try it!

Example of what the default 'concert-this' command in Terminal shows
![](liri-preview.gif)


## Technologies Used
* Node.js
* process.argv
* Client-server model
* Request-response pattern
* Axios
* fs
* Inquirer