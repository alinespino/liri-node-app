

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

if (command === "movie-this") {

  var movie = process.argv[3];
  if (movie = " ") {
    movie = "Mr.Nobody"
  }
  console.log("======" + movie + "====")
  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  // debug // 
  // console.log(queryUrl);

  request(queryUrl, function (error, response, body) {


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
  )
};


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
      }
    });
};

///// DO WHAT IT SAYS /////

if (command === "do-what-it-says") {
  doIt();
}

function doIt() {

  fs.readFile("random.txt", "utf8", function (error, data) {
    console.log(data);

    var dataArray = data.split(",");
    console.log(dataArray);

    if (dataArray.length === 2) {
      command = spotifyThis(dataArray[1]);
    }
  })
};