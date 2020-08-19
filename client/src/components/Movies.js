import React from 'react';
import { Card, Loading } from '.';
import { DELETE_MOVIE, GET_MOVIES } from '../queries/moviesQueries';
import { useQuery, useMutation } from '@apollo/client';
import { favorites } from '../config/client'

function Movies() {
  const { data, loading, error } = useQuery(GET_MOVIES);
  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{
      query: GET_MOVIES
    }]
  });

  if (loading) return <Loading />;
  if (error) return <h1> {JSON.stringify(error)} </h1>;
    
  function removeMovie(id) {
    deleteMovie({ variables: { id } });
  }

  function addToFav(movie) {
    const currentFav = favorites();
    favorites([...currentFav, movie]);
  }

  return (
    <div className="custom-container">
      <h2 className="list-label">Movies</h2>
      <div className="row">
        {data.movies.map(data => {
          return <Card data={data} key={data._id}
            remove={(id) => removeMovie(id)}
            addToFav={(movie) => addToFav(movie)}
          />
        })}
      </div>
    </div>
  )
}

export default Movies;