import { gql } from '@apollo/client';

export const GET_ALL_SERIES = gql`
  query {
    series {
      _id,
      title,
      poster_path,
      popularity,
      tags
    }
  }
`

export const GET_ONE_SERIES = gql`
  query ($id: ID!){
    oneSeries(id: $id) {
      _id,
      title,
      poster_path,
      popularity,
      tags,
      overview
    }
  }
`

export const ADD_SERIES = gql`
  mutation ($newSeries: InsertSeries) {
    insertSeries(series: $newSeries) {
      _id,
      title,
      poster_path,
      popularity,
      tags,
      overview
    }
  }
`

export const UPDATE_SERIES = gql`
  mutation ($id: ID, $series: InsertSeries) {
    updateSeries(id: $id, series: $series) {
      _id,
      title,
      poster_path,
      popularity,
      tags,
      overview
    }
  }
`

export const DELETE_SERIES = gql`
  mutation ($id: ID) {
    deleteSeries(id: $id) {
      _id,
      title,
      poster_path,
      tags,
    }
  }
`