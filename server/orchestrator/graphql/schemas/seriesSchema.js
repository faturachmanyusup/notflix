const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require('ioredis');
const redis = new Redis();

const typeDefs = gql`
  type Series {
    _id: ID
    title: String
    overview: String,
    poster_path: String,
    popularity: Float,
    tags: [String]
  }

  input InsertSeries {
    title: String!,
    overview: String,
    poster_path: String!,
    popularity: Float!,
    tags: [String]!
  }

  extend type Query {
    series: [Series],
    oneSeries(id: ID): Series
  }

  extend type Mutation {
    insertSeries(series: InsertSeries): Series
    updateSeries(id: ID, series: InsertSeries): Series
    deleteSeries(id: ID): Series
  }
`;

const resolvers = {
  Query: {
    series: async () => {
      try {
        let series = await redis.get('series');
        if (series) {
          return JSON.parse(series);
        } else {
          series = await axios.get("http://localhost:3002/series");
          redis.set('series', JSON.stringify(series.data));
          return series.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    oneSeries: async (_, args) => {
      try {
        const id = args.id
        const series = await axios.get(`http://localhost:3002/series/${id}`);
        return series.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  Mutation: {
    insertSeries: async (_, args) => {
      try {
        const reqSeries = args.series;
        const oneSeries = await axios.post(`http://localhost:3002/series`, reqSeries);
        let series = await redis.get('series');
        if (series) {
          series = JSON.parse(series);
          series.push(oneSeries.data);
          redis.set('series', JSON.stringify(series));
        }
        return series.data;
      } catch (e) {
        console.log(e);
      }
    },
    updateSeries: async (_, args) => {
      try {
        const reqSeries = args.series;
        const id = args.id;
        const series = await axios.patch(`http://localhost:3002/series/${id}`, reqSeries);
        return series.data;
      } catch (e) {
        console.log(e);
      }
    },
    deleteSeries: async (_, args) => {
      try {
        const id = args.id;
        const oneSeries = await axios.delete(`http://localhost:3002/series/${id}`);
        let series = await redis.get('series');
        if (series) {
          series = JSON.parse(series);
          series = series.filter(oneSeries => oneSeries._id !== id);
          redis.set('series', JSON.stringify(series));
        }
        return oneSeries.data;
      } catch (e) {
        console.log(e);
      }
    }
  }
};

module.exports = { typeDefs, resolvers };