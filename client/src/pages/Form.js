import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { ADD_MOVIE, UPDATE_MOVIE, GET_MOVIES, GET_MOVIE } from '../queries/moviesQueries';
import { ADD_SERIES, UPDATE_SERIES, GET_ALL_SERIES, GET_ONE_SERIES } from '../queries/seriesQueries';
import { useMutation, useQuery } from '@apollo/client';

function Form() {
  const [genre, setGenre] = useState("");
  const { id } = useParams();
  const { data: oneSeries } = useQuery(GET_ONE_SERIES, {
    variables: { id }
  });
  const { data: movie } = useQuery(GET_MOVIE, {
    variables: { id }
  });
  const { pathname } = useLocation();
  const history = useHistory();
  const [insertMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [{
      query: GET_MOVIES
    }]
  });
  const [insertSeries] = useMutation(ADD_SERIES, {
    refetchQueries: [{
      query: GET_ALL_SERIES
    }]
  });
  const [updateMovie] = useMutation(UPDATE_MOVIE , {
    refetchQueries: [{
      query: GET_MOVIES
    }]
  });
  const [updateSeries] = useMutation(UPDATE_SERIES , {
    refetchQueries: [{
      query: GET_MOVIES
    }]
  });
  const [title, setTitle] = useState('');
  const [poster_path, setPosterPath] = useState('');
  const [popularity, setPopularity] = useState('');
  const [genres, setGenres] = useState([]);
  const [overview, setOverview] = useState('');

  useEffect(() => {
    if (movie) {
      setTitle(movie.movie.title);
      setPosterPath(movie.movie.poster_path);
      setPopularity(movie.movie.popularity);
      setGenres(movie.movie.tags);
      setOverview(movie.movie.overview);
    }
  }, [movie]);

  useEffect(() => {
    if (oneSeries && oneSeries.oneSeries) {
      setTitle(oneSeries.oneSeries.title);
      setPosterPath(oneSeries.oneSeries.poster_path);
      setPopularity(oneSeries.oneSeries.popularity);
      setGenres(oneSeries.oneSeries.tags);
      setOverview(oneSeries.oneSeries.overview);
    }
  }, [oneSeries]);

  useEffect(() => {
    const newGenres = [...genres, genre];
    if (genre !== "") {
      setGenres(newGenres);
    }
    // eslint-disable-next-line
  }, [genre]);

  useEffect(() => {
    setGenre("");
  }, [genres]);

  function handleGenre(event) {
    let added = false;
    genres.forEach(tag => {
      if (tag === event.target.value) {
        added = true;
      }
    });
    if (!added) {
      setGenre(event.target.value);
    }
  }

  function removeTag(value) {
    setGenres(genres.filter(tag => tag !== value));
  }

  function handleSubmitAdd(e) {
    e.preventDefault();
    if (!isNaN(popularity)) {
      const inputData = {
        title,
        poster_path,
        popularity : Number(popularity),
        tags: genres,
        overview
      }
      if(pathname === '/movie/create') {
        insertMovie({ variables: { newMovie: inputData } });
        history.push('/movie');
      } else {
        insertSeries({ variables: { newSeries: inputData } });
        history.push('/series');
      }
    }
  }

  function handleSubmitEdit(e) {
    e.preventDefault();
    if (!isNaN(popularity)) {
      const inputData = {
        title,
        poster_path,
        popularity : Number(popularity),
        tags: genres,
        overview
      }
      if (pathname.slice(0, 6) === '/movie') {
        console.log(inputData, "<<<< input data");
        updateMovie({ variables: { id: id, movie: inputData } });
        history.push('/movie');
      } else {
        updateSeries({ variables: { id: id, series: inputData}});
        history.push('/series');
      }
    }
  }

  // Buttons
  const button = () => {
    if (pathname === '/movie/create' || pathname === '/series/create') {
      return <button className="btn btn-primary mr-3" onClick={(e) => handleSubmitAdd(e)}>Add</button>;
    } else {
      return <button className="btn btn-primary mr-3" onClick={(e) => handleSubmitEdit(e)}>Edit</button>;
    }
  }

  return (
    <div className="form-container">
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            placeholder="e.g. Avengers: Infinity War"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Poster Link</label>
          <input
            className="form-control"
            placeholder="e.g. https://m.media-amazon.com/images/M/MV5BM268_AL_.jpg"
            required
            value={poster_path}
            onChange={(e) => setPosterPath(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Popularity</label>
          <input
            className="form-control"
            placeholder="e.g. 8.7"
            required
            value={popularity}
            onChange={(e) => setPopularity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <select className="custom-select" value={genre} onChange={handleGenre}>
            <option value="">Add Genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
          </select>
          {genres.map((tag, idx) => {
            return <small className="selected-genre mr-2" key={idx}><i className="fa fa-times" onClick={() => removeTag(tag)} /> {tag}</small>
          })}
        </div>
        <div className="form-group">
          <label>Overview</label>
          <textarea
            className="form-control"
            placeholder="Optional"
            value={overview}
            rows="3"
            onChange={(e) => setOverview(e.target.value)}
          />
        </div>
        {button()}
        <button className="btn btn-danger" onClick={() => history.goBack()}>Back</button>
      </form>
    </div>
  )
}

export default Form;