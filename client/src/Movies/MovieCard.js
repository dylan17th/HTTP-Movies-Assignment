import React from 'react';
import { useParams } from 'react-router-dom';


const MovieCard = props => {
  const { title, director, metascore, stars,id} = props.movie;
  // const { id } = useParams();
  

  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
      <button onClick={() => props.editHandler(id)}>Edit movie</button>
      <button onClick={props.deleteHandler}>Delete movie</button>
    </div>
  );
};

export default MovieCard;
