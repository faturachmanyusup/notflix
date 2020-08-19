import React from 'react';
import { useHistory } from 'react-router-dom';

function Card(props) {
  const { remove, addToFav } = props;
  const history = useHistory();

  function detail() {
    history.push(`/movie/${props.data._id}`, {category: props.data.__typename});
  }

  function edit() {
    history.push(`/movie/edit/${props.data._id}`, {category: props.data.__typename});
  }
  
  return (
    <div className="card" style={{width: 12 + 'rem'}}>
      <img className="card-img-top" src={props.data.poster_path} alt={props.data.title} onClick={detail} />
      <div className="card-body" onClick={detail}>
        <h6 className="card-title">{props.data.title}</h6>
        <div className="card-summary">
          <div>
            <span><i className="fa fa-star" aria-hidden="true" />{props.data.popularity}</span>  
          </div>
          <div>
            <ul>
              {props.data.tags.map((tag, idx) => {
                return <li key={idx}>{tag}</li> 
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        {props.data.__typename === 'Movie' &&
          <>
            <button
              type="button"
              className="btn btn-edit"
              onClick={() => edit(props.data)}>
              Edit
            </button>
            <button
              type="button"
              className="btn btn-add-fav"
              onClick={() => addToFav(props.data)}>
              + Favorites
            </button>
          </>
        }
      </div>
        <button
          type="button"
          className="btn btn-remove ml-2 mr-2"
          onClick={() => remove(props.data._id)}>
          Remove
        </button>
    </div>
  )
}

export default Card;