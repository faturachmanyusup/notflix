import React from 'react';
import { Card, Loading } from '.';
import { GET_ALL_SERIES, DELETE_SERIES } from '../queries/seriesQueries';
import { useQuery, useMutation } from '@apollo/client';

function Series() {
  const { data, loading, error } = useQuery(GET_ALL_SERIES);
  const [deleteSeries] = useMutation(DELETE_SERIES, {
    refetchQueries: [{
      query: GET_ALL_SERIES
    }]
  });

  if (loading) return <Loading />;
  if (error) return <h1> {JSON.stringify(error)} </h1>;
    
  function removeSeries(id) {
    deleteSeries({ variables: { id: id } });
  }
  
  return (
    <div className="custom-container">
      <h2 className="list-label">Series</h2>
      <div className="row">
        {data.series.map(data => {
          return <Card data={data} key={data._id} remove={(id) => removeSeries(id)}/>
        })}
      </div>
    </div>
  )
}

export default Series;