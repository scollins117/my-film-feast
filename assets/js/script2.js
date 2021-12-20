// select input data through id
var genreInputEl = document.querySelector("#genre");
var decadeInputEl = document.querySelector("#decade");
var runtimeInputEl = document.querySelector("#runtime");
var goButtonEl = document.querySelector("#go-btn");


// for submission
var formSubmitHandler = function(event) {
    // prevent page from reloading
    event.preventDefault();

    // get values from input elements
    var genre = genreInputEl;
    var decade = decadeInputEl;
    var runtime = runtimeInputEl;
    var actorName = actorInputEl.value.trim();

    console.log(genre);
    console.log(decade);
    console.log(runtime);
    console.log(actorName);

    // if at least one of the variables are valid pass them all to movie recomendation function
    if (genre || decade || runtime || actorName) {
        getMovieRecs(genre, decade, runtime, actorName);

        // clear old content
        genreInputEl = "";
        decadeInputEl = "";
        runtimeInputEl = "";
        actorInputEl.textContent = "";
    } else {
        alert("Please select at least 1 filter")
    }
};

var getMovieRecs =function(genre, decade, runtime, actorName) {
    
    // nonsense
    console.log(genre);
    console.log(decade);
    console.log(runtime);
    console.log(actorName);
    console.log("function call works");

    var apiUrl = "https://api.themoviedb.org/3/movie/550?api_key=7a611b31f4fd5d2deb3ae48914418abb";

      // make a get request to url
  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      console.log(response);
      response.json().then(function(data) {
        console.log(data);
        displayMovies();
      });
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    alert("Unable to connect to MovieDB");
  });
};

var displayMovies = function() {
    // probably a modal goes here?
    console.log("some bullshit");
};

goButtonEl.addEventListener("click", formSubmitHandler);



