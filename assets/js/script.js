//declare variables
const ingredient1 = document.querySelector("#ingredient1");
const ingredient2 = document.querySelector("#ingredient2");
const ingredient3 = document.querySelector("#ingredient3");
const generate = document.querySelector("#submit");
const modal = document.querySelector("#modal");
const close = document.querySelector("#close");
const cancel = document.querySelector("#cancel");


const foodTitle = document.querySelector("#foodTitle");
const foodPhoto = document.querySelector("#foodPhoto");
const movieTitle = document.querySelector("#movieTitle");
const moviePhoto = document.querySelector("#moviePhoto");
let movieSelections = [];
let foodSelections = [];

// gathers selections, parses movie values into numbers
const gatherSelections = (ev) => {
  ev.preventDefault();
// creates object for movie selections to enter into url
  let movie = {
    genre: parseInt(document.querySelector("#genre").value),
    runtime: parseInt(document.querySelector("#runtime").value),
    year: parseInt(document.querySelector("#decade").value)
  };
//creates object for ingredient selections, makes lower case to work with API URL
  let ingredients = {
    ingredient1: (document.querySelector("#ingredient1").value).toLowerCase(),
    ingredient2: (document.querySelector("#ingredient2").value).toLowerCase(),
    ingredient3: (document.querySelector("#ingredient3").value).toLowerCase()
  };
  // adds movie and ingredients into empty array to insert into respective API urls
  movieSelections.push(movie);
  foodSelections.push(ingredients);
  console.log(movie.year);
// generates random number of year between decades
  if (movie.year < 2020) {
  movie.year = (Math.floor((Math.random() * 10)) + movie.year);
  };

//test to make sure objects are generated properly
console.log(movieSelections);
console.log(foodSelections);

let movieURL = `https://api.themoviedb.org/3/discover/movie?api_key=c6d75842800d82b4602daf055d240f68&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&primary_release_year=${movie.year}&with_watch_monetization_types=flatrate&vote_average.gte=7&with_genres=${movie.genre}&vote_count.gte=20&with_runtime.lte=${movie.runtime}`

let foodURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=cac1eb65ed1f478ab7030fe3f22a709b&number=10&ingredients=${ingredients.ingredient1},+${ingredients.ingredient2},+${ingredients.ingredient3}`

// return generated URLs and fire food and movie functions
return fetchMovie(movieURL), fetchFood(foodURL)
};


const fetchMovie = async (movieURL) => {
  try {
    const movieResponse = await fetch(movieURL);
    const movieData = await movieResponse.json();
    return updateMovieModal(movieData);
  } catch (e) {
    console.log("SOMETHING WENT WRONG", e)
  }
  
}

const fetchFood = async (foodURL) => {
  try {
    const foodResponse = await fetch(foodURL);
    const foodData = await foodResponse.json();
    return updateFoodModal (foodData);
  } catch (e) {
    console.log("SOMETHING WENT WRONG", e)
  }
}

const updateMovieModal = function(movieData) { 
movieTitle.innerText = movieData.results[0].original_title;
moviePhoto.src = `https://image.tmdb.org/t/p/w500${movieData.results[0].poster_path}`;
}

const updateFoodModal = function(foodData) {
  foodTitle.innerText = foodData[0].title;
  foodPhoto.src = foodData[0].image;
}

// displays modal on click, cancel and close button on modal
function modalControl() {
  modal.classList.toggle('is-active');
}

// listens for click event on generate button, fires appropriate functions
generate.addEventListener("click", gatherSelections);
generate.addEventListener("click", modalControl);
close.addEventListener("click", modalControl);
