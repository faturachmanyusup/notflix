import { gql } from '@apollo/client';

export const GET_MOVIES_SERIES = gql`
  query {
    movies {
      _id,
      title,
      poster_path,
      popularity,
      tags
    },
    series {
      _id,
      title,
      poster_path,
      popularity,
      tags
    }
  }
`