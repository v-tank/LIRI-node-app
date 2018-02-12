var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');

var command = process.argv[2];
console.log(command);

switch (command) {
  case "my-tweets":
    showMyTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong();
    break;
  case "movie-this":
    break;
  case "do-what-it-says":
    break;
  default:
    console.log("You didn't enter the right command. Please try again.");
}

function showMyTweets() {
  var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

  var params = {
    screen_name: 'mercnews',
    count: 20
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log("Created on: " + tweets[i]["created_at"]);
        console.log("Tweet: " + tweets[i]["text"]);
        console.log("-----------------------------------------");
      }
    }
  });

}

function spotifyThisSong() {
  var Spotify = require('node-spotify-api');
 
  var spotify = new Spotify({
    id: "f82a4a97b31c4127a8f0b0fc499be8ed",
    secret: "d1f88afe80744d8ab842614731935745"
  });
    
    spotify
    .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    .then(function(data) {
        console.log(data); 
    })
    .catch(function(err) {
        console.error('Error occurred: ' + err); 
  });
}

function movieInfo(movieName) {

}

function doWhatItSays() {

}

function appendToFile() {

}