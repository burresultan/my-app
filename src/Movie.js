import React from 'react'
import star from './star.png'

export default function (props) {

  //Funktion för att lägga till betygsstjärnor till filmerna
  function appendStar(rating) {
    let stars = []
    for (let i = 0; i < rating; i++) {
      stars.push(<img src={star} />);
    }
    return stars
  }
  return (
    < li className='list-group-item' >
      {props.movie.Title}
      {appendStar(props.movie.betyg)}
      <button className="btn btn-sm btn-danger float-end" onClick={() => { props.deleteMovie(props.movie.id) }}>X</button>
    </li>

  )
}
