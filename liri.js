

// Commands //

// Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

//TWITTER // 

var keys = require ("./keys.js");
var Twitter = require('twitter');
var client = keys;
var myTweets = process.argv[2]


if (myTweets === "my-tweets"){

    var params = {
        count:20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
      }
    });
}

// client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
//     console.log(tweets);
//  });



// OMDB
// node liri.js movie-this '<movie name here>'

var request = require("request");
var movie = process.argv[3];
var omdb = process.argv[2]


var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

// debug // 
// console.log(queryUrl);

request(queryUrl, function(error, response, body) {

//user must type movie-this // 
    if ( omdb === "movie-this") {

 // If the request is successful//
      if (!error && response.statusCode === 200) {
    
        console.log("Title of the movie:" + JSON.parse(body).Title);
        console.log("Released on: " + JSON.parse(body).Year);
        console.log("IMDB Rating:" + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating:" + JSON.parse(body).Ratings[1].Source);
        console.log("Country:" + JSON.parse(body).Country);
        console.log("Plot:" + JSON.parse(body).Plot);
        console.log("Actors:" + JSON.parse(body).Actors);
      }
    }
    });

    // NEED TO SOLVE HOW TO CALL MR NOBODY // 

// if (movie === " ") {
//     var blank = "Mr.Nobody";
//     var newQueryUrl = "http://www.omdbapi.com/?t=" + blank + "&y=&plot=short&apikey=trilogy";
//     console.log(newQueryUrl);
    
//     request(newQueryUrl, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
            
//                 console.log("Title of the movie:" + JSON.parse(body).Title);
//                 console.log("Released on: " + JSON.parse(body).Year);
//                 console.log("IMDB Rating:" + JSON.parse(body).imdbRating);
//                 console.log("Rotten Tomatoes Rating:" + JSON.parse(body).Ratings[1].Source);
//                 console.log("Country:" + JSON.parse(body).Country);
//                 console.log("Plot:" + JSON.parse(body).Plot);
//                 console.log("Actors:" + JSON.parse(body).Actors);
                //    console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/"+
                //     "It's on Netflix!");

//               }
            
//             });
// }



