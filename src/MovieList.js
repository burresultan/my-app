import Movie from './Movie';
import React, { useState, useRef } from 'react'

export default function MovieList() {

  const [movies, getMovies] = useState([]);
  //Hämtar användarens input
  const movieRate = useRef();
  const inputreference = useRef();

  function newMovie(event) {
    //Förhindrar formulär från att skickas
    event.preventDefault()


    //Alerts för att säkerställa att både titel och betyg fylls i
    if (inputreference.current.value <= 0) {
      alert("Du måste ange en titel för att kunna spara filmen");
    } else if (movieRate.current.value <= 0) {
      alert("Du måste ange ett betyg för att kunna spara filmen")
    }
    //Om det är ifyllt så lägger vi till en film
    else {
      const newMovieId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;

      getMovies([...movies, {
        id: newMovieId,
        Title: inputreference.current.value,
        betyg: movieRate.current.value
      }]);

      //Återställer titel och betyg
      inputreference.current.value = "";
      movieRate.current.value = "";
    }
  }


  //Funktion för att sortera efter alfabetisk ordning (A-Ö)
  function sortAsc() {
    const sortAscMovies = movies.sort(function (a, b) {
      if (a.Title < b.Title) return -1;
      if (a.Title < b.Title) return 1;
      return 0;
    })
    getMovies(Array.from(sortAscMovies))
    console.log(sortAscMovies);
  }

  //Funktion för att sortera efter betyg (Hög-Låg)
  function sortRat() {
    const rating = movies.sort((a, b) => b.betyg - a.betyg);
    getMovies(Array.from(rating))
    console.log(sortRat)
  }

  //Funktion som tar bort en film
  function deleteMovie(id) {
    getMovies(movies.filter((movie) => movie.id !== id));
  }

  //All HTML kod, tagen från bootsrap
  return (
    <div>
      <form class="row g-3">
        <div className="col-md-6">

          <strong>
            <label for="Titel" class="form-label">Ange Titel</label>
            <input type="text" placeholder='Välj titel...' class="form-control" ref={inputreference}></input>
          </strong>


          <label for="rating-field">Betyg:</label>

          <select type=" text" className="form-control" ref={movieRate}>
            <option value="0">Välj betyg här...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div class="col-12">

          <button type="submit" class="btn btn-primary" onClick={newMovie}>Spara film</button>
        </div>
      </form>

      <h2>Inlagda Filmer</h2>

      <ul className="list-group" class="col-6">
        {movies.map(movie => <Movie key={movie.id} movie={movie} deleteMovie={deleteMovie} />)}
      </ul>


      <button type='button' id='sortAsc' class="btn btn-primary" onClick={sortAsc}>Alfabetisk ordning</button>
      <button type='button' id='sortRat' class="btn btn-primary" onClick={sortRat}>Betygsordning</button>

    </div>

  )
}
