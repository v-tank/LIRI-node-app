var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require("fs");

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
    movieInfo(arg);
    break;
  case "do-what-it-says":
    doWhatItSays();
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
    if (error) {
      console.log(error);
    } else {
      for (var i = 0; i < tweets.length; i++) {
        console.log("Created on: " + tweets[i]["created_at"]);
        console.log("Tweet: " + tweets[i]["text"]);
        console.log("-----------------------------------------");
      }

      var output = 
        `Displayed the latest 20 tweets from Mercury News.` + `\n` +
        `-----------------------------------------` + `\n`;
      appendToFile(output);
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

  spotify.search({ type: 'track', query: query, limit: 1 }, function(error, data) {
    if (error) {
      console.log(error);
    } else {
      var trackName = data["tracks"]["items"][0]["name"];
      var artists = data["tracks"]["items"][0]["artists"][0]["name"];
      var previewURL = data["tracks"]["items"][0]["preview_url"];
      var albumName = data["tracks"]["items"][0]["album"]["name"];
      console.log("Song name: " + trackName);
      console.log("Artist(s): " + artists);
      console.log("Album: " + albumName);
      console.log("Preview URL: " + previewURL);
      console.log("-----------------------------------------");

      var output = 
        `Song Name: ` + trackName + `\n` +
        `Artist(s): ` + artists + `\n` +
        `Album: ` + albumName + `\n` +
        `Preview URL: ` + previewURL + `\n` +
        `-----------------------------------------` + `\n`;
      appendToFile(output);
      // data["tracks"]["items"][0]["album"]["artists"][0]["name"]
    }
  });
}

function movieInfo(movieName) {
  if (!movieName) {
    movieName = "Mr.+Nobody";
  } else {
    movieName = movieName;
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb_key;

  request(queryUrl, function(error, response, body) {
    if (error) {
      console.log(error);
    } else if (!error && response.statusCode === 200) {
      var title = JSON.parse(body)["Title"];
      var yearReleased = JSON.parse(body)["Year"];
      var imdbRating = JSON.parse(body)["imdbRating"];
      var rottenTomatoesRating = JSON.parse(body)["Ratings"][1]["Value"];
      var country = JSON.parse(body)["Country"];
      var language = JSON.parse(body)["Language"];
      var plot = JSON.parse(body)["Plot"];
      var actors = JSON.parse(body)["Actors"];

      console.log("Title: " + title);
      console.log("Year Released: " + yearReleased);
      console.log("IMDb Rating: " + imdbRating);
      console.log("Rotten Tomatoes Rating: " + rottenTomatoesRating);
      console.log("Country: " + country);
      console.log("Language: " + language);
      console.log("Plot: " + plot);
      console.log("Actors: " + actors);
      console.log("-----------------------------------------");

      var output = 
        `Title: ` + title + `\n` +
        `Year Released: ` + yearReleased + `\n` +
        `IMDb Rating: ` + imdbRating + `\n` +
        `Rotten Tomatoes Rating: ` + rottenTomatoesRating + `\n` +
        `Country: ` + country + `\n` +
        `Language: ` + language + `\n` +
        `Plot: ` + plot + `\n` +
        `Actors: ` + actors + `\n` +
        `-----------------------------------------` + `\n`;
      appendToFile(output);
    }
  });
}

function doWhatItSays() {

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var splitData = data.split(",");
      console.log(splitData);

      var todo = splitData[0];
      // console.log("To Do: " +todo);
      var queryString = splitData[1];

      switch (todo) {
      case "my-tweets":
        showMyTweets();
        break;
      case "spotify-this-song":
        spotifyThisSong(queryString);
        break;
      case "movie-this":
        movieInfo(queryString);
        break;
      }
    }
  }); 
}

function appendToFile(output) {
  fs.appendFile("log.txt", output, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}