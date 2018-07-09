require("dotenv").config();
var keys = require("./keys")
// console.log(keys)
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var inquirer = require("inquirer");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
// console.log(command);
// console.log(term)

inquirer.prompt([
    {
        type: "list",
        name: "doingWhat",
        message: "What do you want to search for?",
        choices: ['my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says']
    },
    {
        type: "input",
        message: "Enter the search term: ",
        name: "term"
    }
]).then(function (user) {

//         // If the user guesses the password...
//         if (user.choices === "my tweets") {
//             word = 'my-tweets';
//         }
//         else if (user.choices === "spotify song") {
//             word = 'spotify-this-song';
//             console.log(word);
//         }
//         else if (user.choices === "movie title") {
//             word = 'moive-this';
//         }
//         else if (user.choices === "anything you want") {
//             word = 'do-what-it-says';
//         }
    
//    let command = process.argv[2];
//    let term = process.argv[3]


    switch (user.choices) {
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
            spotify.search({ type: 'track', query: user.term }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log('The artist is... ' + data.tracks.items[0].album.artists[0].name);
            }); break;
        case 'movie-this':

            // Then run a request to the OMDB API with the movie specified
            request("http://www.omdbapi.com/?t=" + user.term + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

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
            alert('dojo Wins!');
            break;
        default:
            alert('Nobody Wins!');
    }

    // var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


    // // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);


    // // Then create a request to the queryUrl
    // // ...
    // request(queryUrl, { json: true }, (err, res, body) => {
    //   if (err) { return console.log(err); }
    //   console.log(body.Released);
    // });

})