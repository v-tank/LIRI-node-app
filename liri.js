// Require all the needed packages and files
var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require('request');
var Spotify = require('node-spotify-api');
var fs = require("fs");

// Renames the input array
var initialArray = process.argv;

// Grabs the first argument entered as the desired command
var command = process.argv[2];

// Declares an empty string that hold the user input parameters
var arg = "";

// Go through the remainder of the array and append the words to the empty string
for (var i = 3; i < initialArray.length; i++) {
  if (i > 3 && i < initialArray.length) {
    arg = arg + "+" + initialArray[i];
  }
  else {
    arg = initialArray[i];
  }
}

// console.log(arg);

// Switch statement to call different functions depending on the user input
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

// Function to show the tweets from a random account
function showMyTweets() {

  // Creates an instance of the Twitter object and its arguments
  var client = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
  });

  // Input parameters to call define the user who's tweets we want to display and the limit
  var params = {
    screen_name: 'mercnews',
    count: 20
  };

  // Call to get 20 latest tweets from the user's timeline
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    // Log the error (if any)
    if (error) {
      console.log(error);
    } else {

      // Else, iterate through the response object and log each tweet
      for (var i = 0; i < tweets.length; i++) {
        console.log("Created on: " + tweets[i]["created_at"]);
        console.log("Tweet: " + tweets[i]["text"]);
        console.log("-----------------------------------------");
      }

      // Variable that holds info to display in the log.txt file.
      var output = 
        `Displayed the latest 20 tweets from Mercury News.` + `\n` +
        `-----------------------------------------` + `\n`;
      
      // Calls function to append above variable to the log.txt file
      appendToFile(output);
    }
  });
}

// Function to display song info based on user's query
function spotifyThisSong(query) {
  
  // Creates an instance of the Spotify object and its arguments
  var spotify = new Spotify({
    id: keys.spotify_id,
    secret: keys.spotify_secret
  });

  // If no song name is passed, default to the following string
  if (!query) {
    query = "The+Sign+Ace+Of+Base";
  } else {
    query = query;
  }

  // Call the search method on the spotify object and pass the type, the name of the track, as well as the limit of responses
  spotify.search({ type: 'track', query: query, limit: 1 }, function(error, data) {
    // Log the error (if any)
    if (error) {
      console.log(error);
    } else {

      // Else, store the response objects into variables
      var trackName = data["tracks"]["items"][0]["name"];
      var artists = data["tracks"]["items"][0]["artists"][0]["name"];
      var previewURL = data["tracks"]["items"][0]["preview_url"];
      var albumName = data["tracks"]["items"][0]["album"]["name"];

      // Log the required info to the console.
      console.log("Song name: " + trackName);
      console.log("Artist(s): " + artists);
      console.log("Album: " + albumName);
      console.log("Preview URL: " + previewURL);
      console.log("-----------------------------------------");

      // Variable that holds info to display in the log.txt file.
      var output =
        `Song Name: ` + trackName + `\n` +
        `Artist(s): ` + artists + `\n` +
        `Album: ` + albumName + `\n` +
        `Preview URL: ` + previewURL + `\n` +
        `-----------------------------------------` + `\n`;

      // Calls function to append above variable to the log.txt file
      appendToFile(output);
    }
  });
}

// Function to display the movie info based on the user's query
function movieInfo(movieName) {
  // If no movie has been entered, default to the following string
  if (!movieName) {
    movieName = "Mr.+Nobody";
  } else {
    movieName = movieName;
  }

  // Create the query URL using the given movie name and the API key for OMDb
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb_key;

  // Make the request using the url 
  request(queryUrl, function(error, response, body) {
    // Log errors (if any)
    if (error) {
      console.log(error);
    } else if (!error && response.statusCode === 200) {

      // Else, store the response objects into variables
      var title = JSON.parse(body)["Title"];
      var yearReleased = JSON.parse(body)["Year"];
      var imdbRating = JSON.parse(body)["imdbRating"];
      var rottenTomatoesRating = JSON.parse(body)["Ratings"][1]["Value"];
      var country = JSON.parse(body)["Country"];
      var language = JSON.parse(body)["Language"];
      var plot = JSON.parse(body)["Plot"];
      var actors = JSON.parse(body)["Actors"];

      // Log the required movie info to the console.
      console.log("Title: " + title);
      console.log("Year Released: " + yearReleased);
      console.log("IMDb Rating: " + imdbRating);
      console.log("Rotten Tomatoes Rating: " + rottenTomatoesRating);
      console.log("Country: " + country);
      console.log("Language: " + language);
      console.log("Plot: " + plot);
      console.log("Actors: " + actors);
      console.log("-----------------------------------------");

      // Variable that holds info to display in the log.txt file.
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

      // Calls function to append above variable to the log.txt file
      appendToFile(output);
    }
  });
}

// Function to read commands from a file and execute depending on the user's input
function doWhatItSays() {

  // Reads the data from a file called 'random.txt'
  fs.readFile("random.txt", "utf8", function(error, data) {
    // Log errors (if any)
    if (error) {
      console.log(error);
    } else {

      // Else, store info into an array by splitting at the comma; if only one word is given, no worries!
      var splitData = data.split(",");
      
      // Grabs the command to execute
      var todo = splitData[0];

      // Grabs the query (if any)
      var queryString = splitData[1];

      // Switch statement to call on corresponding functions; does not include 'do-what-it-says' to prevent inception.
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
        default: 
          console.log("You didn't enter the right command. Please try again.");
        }
    }
  }); 
}

// Function to append variables to a log.txt file
function appendToFile(output) {
  // Appends the variable 'output' created in each function above to a file called 'log.txt'. 
  fs.appendFile("log.txt", output, function(error) {
    // Log errors (if any) 
    if (error) {
      console.log(error);
    }
    else {

      // Else, logs the confirmation that the data was appended successfully to the file.
      console.log("Data added to the log file.");
    }
  });
}