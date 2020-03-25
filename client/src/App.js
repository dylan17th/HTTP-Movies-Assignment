import React, { useState, useEffect } from "react";
import { Route, useParams, useHistory} from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import EditMovie from './Movies/EditMovie';

const App = () => {

  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const editHandler = id => {
    history.push(`edit-movie/${id}`)
  }

  const deleteHandler = id => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
      console.log(res)
      const newArray = movieList.filter( movie => {
        if( movie.id !== res.data){
          return movie
        }else {
          return null
        }
      })
      setMovieList(newArray)
      history.push('/');
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>
      <Route exact path="/movies/:id">
        <Movie addToSavedList={addToSavedList} editHandler={editHandler} deleteHandler={deleteHandler} />
      </Route>
      <Route path="/movies/edit-movie/:id">
        <EditMovie movie={movieList} setMovie={setMovieList} />
      </Route>
    </>
  );
};

export default App;
