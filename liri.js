
var keys = require ("./keys.js");


// Commands //

// Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says


// OMDB
// node liri.js movie-this '<movie name here>'

var request = require("request");
var movie = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

// debug // 
console.log(queryUrl);

request(queryUrl, function(error, response, body) {
    
      // If the request is successful
      if (!error && response.statusCode === 200) {
    

        // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        console.log("Title of the movie:" + JSON.parse(body).Title);
        console.log("Released on: " + JSON.parse(body).Year);
        console.log("IMDB Rating:" + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating:" + JSON.parse(body).Ratings[1].Source);
        console.log("Country:" + JSON.parse(body).Country);
        console.log("Plot:" + JSON.parse(body).Plot);
        console.log("Actors:" + JSON.parse(body).Actors);

      }
    });

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!
// You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.