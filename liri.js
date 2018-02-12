var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');

var command = process.argv[2];
var arg = "";

for (var i = 3; i < process.argv.length; i++) {
  if (i > 3 && i < process.argv.length) {
    arg = arg + "+" + process.argv[i];
  }
  else {
    arg += process.argv[i];
  }
}


switch (command) {
  case "my-tweets":
    showMyTweets();
    break;
  case "spotify-this-song":
    spotifyThisSong(arg);
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

function spotifyThisSong(query) {
   
  var spotify = new Spotify({
    id: keys.spotify_id,
    secret: keys.spotify_secret
  });

  if (!query) {
    query = "The+Sign+Ace+Of+Base";
  } else {
    query = query;
  }

  // console.log(query);

  spotify.search({ type: 'track', query: query, limit: 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
      var trackName = data["tracks"]["items"][0]["name"];
      var artists = data["tracks"]["items"][0]["artists"][0]["name"];
      var previewURL = data["tracks"]["items"][0]["preview_url"];
      var albumName = data["tracks"]["items"][0]["album"]["name"];
      console.log("Song name: " + trackName);
      console.log("Artist(s): " + artists);
      console.log("Album: " + albumName);
      console.log("Preview URL: " + previewURL);
      // data["tracks"]["items"][0]["album"]["artists"][0]["name"]
    }
  });
}

function movieInfo(movieName) {

}

function doWhatItSays() {

}

function appendToFile() {

}