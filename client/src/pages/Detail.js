import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { GET_MOVIE } from '../queries/moviesQueries';
import { GET_ONE_SERIES } from '../queries/seriesQueries';
import { useQuery } from '@apollo/client';
import { Loading } from '../components';

function Detail(props) {
  const { id } = useParams();
  const { state } = useLocation();
  const [dataToShow, setDataToShow] = useState(null);
  const {data: series, refetch: refetchSeries} = useQuery(GET_ONE_SERIES, {
    variables: { id }
  });
  const {data: movie, refetch: refetchMovie} = useQuery(GET_MOVIE, {
    variables: { id }
  });

  useEffect(() => {
    if (state.category === 'Movie') refetchMovie();
    else refetchSeries();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if(state.category === 'Movie' && movie) {
      setDataToShow(movie.movie);
    }
  }, [movie, state.category]);
  
  useEffect(() => {
    if(state.category === 'Series' && series) {
      setDataToShow(series.oneSeries);
    }
  }, [series, state.category]);

  if(!dataToShow) return <Loading />
  
  return (
    <div className="detail-card row justify-content-center">
      <div className="col-5 bg-light">
        <h2 className="mt-3"><strong>{dataToShow.title}</strong></h2>
        <hr/>
        <h4 className="mt-2">Overview:</h4>
        <h6 className="overview mt-3 mb-5">{dataToShow.overview}</h6>
        <h3>Popularity:</h3>
        <h4><i className="fa fa-star" aria-hidden="true" />{dataToShow.popularity}</h4>
        <div className="d-flex bg-light mt-5">
        {dataToShow.tags.map((tag, idx) => {
          return <span key={idx} className="mr-2">{tag}</span>
        })}
      </div>
      </div>
      <div className="col-3">
        <img src={dataToShow.poster_path} alt={dataToShow.title} className="h-100 w-100" />
      </div>
    </div>
  )
}

export default Detail;