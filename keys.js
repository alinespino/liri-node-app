
console.log('this is loaded');


// var twitterKeys = {
//   consumer_key:'d12ejpDblwFm0jpAfixIM9fg3',
//   consumer_secret:'UYXyrPehasgiklNPhpvkqg2dS2YLiU2vHvCtBG6uIhCQyqPx8j',
//   access_token_key:'39117384-NOd1ylaeJ41hQNYLS6HdH1HRoiQamXwhNQFHhkI4Q',
//   access_token_secret:'idffZdVFnIuC6mT0klrOkh3e05NLLeMjJoravTR7oi3P1',
// }

// module.exports = twitterKeys;

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

