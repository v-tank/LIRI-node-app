# LIRI
A node app that takes commands and arguments from the user and fetches data from several APIs (*[Twitter](https://apps.twitter.com/app/new), [Spotify](https://beta.developer.spotify.com/dashboard/), and [OMDb](http://www.omdbapi.com)*). The results are logged to the console and to a *log.txt* file.

### Technlogies Used:
This is a node app created using JS and several NPM packages such as *[Twitter](https://www.npmjs.com/package/twitter), [Require](https://www.npmjs.com/package/request), and [Spotify](https://www.npmjs.com/package/node-spotify-api)*. I also used the internal *fs* package to write to and read from different files. 

### Why:
This was a great way to learn how to use NPM packages in our programs to simplify many tasks. I also learned how to read and append files using node's built-in methods/

### How to get started:
Feel free to clone the repo to access the code to get started. You will, however, have to sign up for your own Spotify as well as a Twitter account. You will also have to generate your own API keys for [Twitter](https://apps.twitter.com/app/new), [Spotify](https://beta.developer.spotify.com/dashboard/), and [OMDb](http://www.omdbapi.com) and replace the existing ones in the uploaded *keys.js* file. To run the program, navigate to the root directory with all the files and enter the commands in the following format: 
  `node <command> <argument>`
  
  Valid <commands> include the following (do not enter '<>' angle brackets):
  * _my-tweets_
  * _spotify-this-song_
  * _movie-this_
  * _do-what-it-says_
  
  Arguments are not at all required for '**my-tweets**' and '**do-what-it-says**'. '**spotify-this-song**' and '**movie-this**' can take in any argument and will default to specific values if none are entered.
  
  '**do-what-it-says**' reads the text in the *random.txt* file and calls the corresponding function depending on the data it finds in there. The text within that file has to be in the following format with no extra characters or white space:
  
  **spotify-this-song,"I Want it That Way"**

### How to look for help:
Reach out to me if you need help understanding any of the code for this app; I'd be happy to explain it to you!
