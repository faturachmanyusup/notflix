const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require('ioredis');
const redis = new Redis();

const typeDefs = gql`
  type Movie {
    _id: ID,
    title: String,
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  input InsertMovie {
    title: String!,
    overview: String,
    poster_path: String!,
    popularity: Float!,
    tags: [String]!
  }

  extend type Query {
    movies: [Movie],
    movie(id: ID): Movie
  }

  extend type Mutation {
    insertMovie(movie: InsertMovie): Movie
    updateMovie(id: ID, movie: InsertMovie): Movie
    deleteMovie(id: ID): Movie
  }
`;

const resolvers = {
  Query: {
    movies: async () => {
      try {
        let movies = await redis.get('movies');
        if (movies) {
          return JSON.parse(movies);
        } else {
          movies = await axios.get("http://localhost:1001/movies");
          redis.set('movies', JSON.stringify(movies.data));
          return movies.data;
        }
      } catch (e) {
        console.log(e);
      }
    },
    movie: async (_, args) => {
      try {
        const id = args.id;
        const movie = await axios.get(`http://localhost:1001/movies/${id}`);
        return movie.data;
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    insertMovie: async (_, args) => {
      try {
        const reqMovie = args.movie;
        const movie = await axios.post(`http://localhost:1001/movies`, reqMovie);
        let movies = await redis.get('movies');
        if (movies) {
          movies = JSON.parse(movies);
          movies.push(movie.data);
          redis.set('movies', JSON.stringify(movies));
        }
        return movie.data;
      } catch (e) {
        console.log(e);
      }
    },
    updateMovie: async (_, args) => {
      try {
        const reqMovie = args.movie;
        const id = args.id;
        const movie = await axios.patch(`http://localhost:1001/movies/${id}`, reqMovie);
        return movie.data;
      } catch (e) {
        console.log(e);
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const id = args.id;
        const movie = await axios.delete(`http://localhost:1001/movies/${id}`);
        let movies = await redis.get('movies');
        if (movies) {
          movies = JSON.parse(movies);
          movies = movies.filter(movie => movie._id !== id);
          redis.set('movies', JSON.stringify(movies));
        }
        return movie.data;
      } catch (e) {
        console.log(e);
      }
    }
  }
};

module.exports = { typeDefs, resolvers };