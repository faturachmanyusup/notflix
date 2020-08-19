import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
  query {
    movies {
      _id,
      title,
      poster_path,
      popularity,
      tags
    }
  }
`

export const GET_MOVIE = gql`
  query ($id: ID!){
    movie(id: $id) {
      _id,
      title,
      poster_path,
      popularity,
      tags,
      overview
    }
  }
`

export const ADD_MOVIE = gql`
  mutation ($newMovie: InsertMovie) {
    insertMovie(movie: $newMovie) {
      _id,
      title,
      poster_path,
      popularity,
      tags,
      overview
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation ($id: ID, $movie: InsertMovie) {
    updateMovie(id: $id, movie: $movie) {
      _id,
      title,
      poster_path,
      popularity,
      tags,
      overview
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation ($id: ID) {
    deleteMovie(id: $id) {
      _id,
      title,
      poster_path,
      tags,
    }
  }
`