require("dotenv").config();
var keys = require("./keys")
// console.log(keys)
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

  

let command = process.argv[2];
let term = process.argv[3]
// let process.argv[2].user.choices;

switch (command) {
    case 'my-tweets':
        client.get('search/tweets', { q: 'Jacob37131137' }, function (error, tweets, response) {
            // console.log(response);
            console.log(tweets.statuses[0].text);
            console.log('===========================');
            console.log('My tweets are listed below:')
            console.log('===========================')

            for (let i = 0; i < tweets.statuses.length; i++) {
                console.log('Tweet: ' + tweets.statuses[i].text + ', ||||||||||||||   created: ' + tweets.statuses[i].created_at);
            }
            console.log('===========================');
        });

        break;
    case 'spotify-this-song':
        spotify.search({ type: 'track', query: term }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(data.tracks.items[0].album.artists);
            console.log('The artist is... ' + data.tracks.items[0].album.artists[0].name);
            console.log('The song title is... ' + data.tracks.items[0].name);

            console.log('Link to the song on Spotify: ' + data.tracks.items[0].preview_url)
            console.log('The album name is... ' + data.tracks.items[0].album.name);

        }); break;
    case 'movie-this':

        // Then run a request to the OMDB API with the movie specified
        request("http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                // * Title of the movie.
                // * Year the movie came out.
                // * IMDB Rating of the movie.
                // * Rotten Tomatoes Rating of the movie.
                // * Country where the movie was produced.
                // * Language of the movie.
                // * Plot of the movie.
                // * Actors in the movie.
                // console.log(JSON.parse(body));

                console.log('Title: ' + JSON.parse(body).Title);
                console.log('Year of release: ' + JSON.parse(body).Year);
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                if (!(JSON.parse(body).Ratings[1])) {
                    console.log('No Rotten Tomatoes rating.');
                }
                else {
                    console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
                };
                console.log('Country of production: ' + JSON.parse(body).Country);
                console.log('Language: ' + JSON.parse(body).Language);
                console.log('Plot: ' + JSON.parse(body).Plot);
                console.log('Actors: ' + JSON.parse(body).Actors);





            }
        });

        break;
    case 'do-what-it-says':
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        // console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",").join(' ');
      
        // // We will then re-display the content as an array for later use.
        console.log(dataArr);
        spotify.search({ type: 'track', query: dataArr[1] }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(data.tracks.items[0].album.artists);
            console.log('The artist is... ' + data.tracks.items[0].album.artists[0].name);
            console.log('The song title is... ' + data.tracks.items[0].name);

            console.log('Link to the song on Spotify: ' + data.tracks.items[0].preview_url)
            console.log('The album name is... ' + data.tracks.items[0].album.name);

        });      
      });
        break;
    default:
        alert('Nobody Wins!');
}

