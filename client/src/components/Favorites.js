import React from 'react';
import { Card, Loading } from '.';
import { GET_FAVORITES } from '../queries/favoritesQueries';
import { useQuery } from '@apollo/client';
import { favorites } from '../config/client'

function Favorites() {
  const { data, loading, error } = useQuery(GET_FAVORITES);

  if (loading) return <Loading />;
  if (error) return <h1> {JSON.stringify(error)} </h1>;

  function removeFromFav(id) {
    let currentFav = favorites();
    currentFav = currentFav.filter(favorite => favorite._id !== id);
    favorites(currentFav);
  }

  const emptyFavScreen = () => {
    return (
      <div className="empty-favorites custom-container">
        <h2 className="list-label">Your Favorites is Empty</h2>
      </div>
    )
  }

  if(data.favorites.length < 1) return emptyFavScreen();

  return (
    <div className="custom-container">
      <h2 className="list-label">Favorites</h2>
      <div className="row">
        {data.favorites.map(data => {
          return <Card data={data} key={data._id} remove={(id) => removeFromFav(id)} />
        })}
      </div>
    </div>
  )
}

export default Favorites;