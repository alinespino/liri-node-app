

// Req .env file // 
require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var request = require("request");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var command = process.argv[2];


///// TWITTER ///// 


if (command === "my-tweets") {

  var client = new Twitter(keys.twitter);

  var params = {
    screen_name: 'nodejs',
    count: 20
  };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) {
      console.log(error);
    }

    else {
      // console.log(tweets);
      tweets.forEach((item) => {
        console.log('\ntweet ID -------------------------------------------------');
        console.log(item.id);
        // console.log(item.description);
        console.log('tweet text -------------------------------------------------');
        console.log(item.text);
      });
    }
  });
};


///// OMDB /////


var movie = process.argv[3];
var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

// debug // 
// console.log(queryUrl);

request(queryUrl, function (error, response, body) {

  //user must type movie-this // 
  if (command === "movie-this") {

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


///// SPOTIFY /////


if (command === 'spotify-this-song') {
  var searchSong = process.argv[3]
  spotifyThis(searchSong);
};


// log.txt file // 
var thisArtists = function (artist) {
  return artist.name;
}

// Run Spotify //

function spotifyThis(songSearch) {

  var spotify = new Spotify(keys.spotify);

  if (songSearch === undefined) {
    songSearch = 'The Sign Ace of Base'
  };

  spotify.search(
    {
      type: 'track',
      query: songSearch
    },
    function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
    
        // Preview songs // console.log(songs[i]);
        console.log('artist:' + songs[i].artists.map(thisArtists));
        console.log('song name:' + songs[i].name);
        console.log('preview of the song:' + songs[i].preview_url);
        console.log('album: ' + songs[i].album.name);
        console.log('====================================')



        // Joel's help DELETE// 
        // console.log("Artist is:" + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
        // console.log("Song is:" + JSON.stringify(data.tracks.items[0].name, null, 2));

      }
    });
};

///// DO WHAT IT SAYS /////


if (command === "do-what-it-says") {
  doIt();
}

function doIt() {

  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);

  })
};