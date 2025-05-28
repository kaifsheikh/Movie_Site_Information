// Movie Title URL :  https://www.omdbapi.com/?s=thor&page=1&apikey=a2a41b5d
// Movie detail URL : http://www.omdbapi.com/?i=tt3896198&apikey=a2a41b5d

const moviesearchbox = document.getElementById('movie-search-box');
const searchlist = document.getElementById('search-list');
const resultgrid = document.getElementById('result-grid');

// load movie form API

async function loadmovies(searchterm) {

    const URL = `https://www.omdbapi.com/?s=${searchterm}&page=1&apikey=a2a41b5d`;

    const res = await fetch(`${URL}`);
    const data = await res.json();
    if (data.Response == "True") {
        displaymovielist(data.Search);
    }
}

function findmovies() {
    let searchterm = (moviesearchbox.value).trim();

    if (searchterm.length > 0) {
        searchlist.classList.remove('hide-search-list');
        loadmovies(searchterm);
    } else {
        searchlist.classList.add('hide-search-list');
    }
}

function displaymovielist(movies) {

    searchlist.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movielistitem = document.createElement('div');
        movielistitem.dataset.id = movies[idx].imdbID;
        movielistitem.classList.add('search-list-item');
        if (movies[idx].type == "N/A") {
            moviePoster = movies[idx].type;
        } else {

            moviePoster = "images/download.png";

            movielistitem.innerHTML = `
            <div class="search-item-thumbnail">
            <img src="${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
            `;

            searchlist.appendChild(movielistitem);
        }
    }

    loadmovieDetails();
}

function loadmovieDetails() {
    const searchlistmovies = searchlist.querySelectorAll('.search-list-item');
    searchlistmovies.forEach(movie => {

        movie.addEventListener("click", async () => {
            searchlist.classList.add('hide-search-list');
            moviesearchbox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=a2a41b5d`);
            const moviedetails = await result.json();
            displaymoviedetails(moviedetails);
        });
    });
}

function displaymoviedetails(details) {
    resultgrid.innerHTML = `
        <div class="movie-poster">
        
        <img src=" ${(details.Type = "N/A") ? details.Poster : "download.png"}" alt = "movie Poster" >

        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b> ${details.Genre}</p>
            <p class="write"><b>Writer:</b> ${details.Writer}</p>
            <p class="actors"><b>Actors:</b> ${details.Actors}</p>
            <p class="plot"><b>Plot:</b> ${details.Plot}</p>
            <p class="language"><b>Language:</b> ${details.Language}</p>
            <p class="awards"><b><i class="fas fa-award"></i></b> ${details.Awards}</p>
        </div>
    </div >
        `;
}