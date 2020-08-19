import { gql } from '@apollo/client';

export const GET_FAVORITES = gql`
  query {
    favorites {
      _id,
      title,
      poster_path,
      popularity,
      tags
    }
  }
`
