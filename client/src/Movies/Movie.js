import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, editHandler, deleteHandler }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { id } =useParams()

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} editHandler={editHandler} deleteHandler={deleteHandler} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <button onClick={() => editHandler(id)}>Edit movie</button>
      <button onClick={() => deleteHandler(id)}>Delete movie</button>
    </div>
  );
}

export default Movie;
