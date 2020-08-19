const axios = require('axios');
const urlMovies = 'http://localhost:3001/movies';
const Redis = require("ioredis");
const redis = new Redis();

class MovieController {
  static async find(_, res) {
    try {
      let movies = await redis.get('movies');
      if (movies) {
        return res.status(200).json(JSON.parse(movies));
      } else {
        movies = await axios(`${urlMovies}`);
        redis.set('movies', JSON.stringify(movies.data), 'EX', 600);
        return res.status(200).json(movies.data);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async findOne(req, res) {
    try {
      const movie = await axios(`${urlMovies}/${req.params.id}`);
      return res.status(200).json(movie.data);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async insert(req, res) {
    try {
      const movie = await axios({
        method: 'POST',
        url: urlMovies,
        data: req.body
      });
      return res.status(201).json(movie.data[0]);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async updateOne(req, res) {
    try {
      const movie = await axios({
        method: 'PATCH',
        url: `${urlMovies}/${req.params.id}`,
        data: req.body
      });
      return res.status(200).json(movie.data);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async deleteOne(req, res) {
    try {
      const movie = await axios({
        method: 'DELETE',
        url: `${urlMovies}/${req.params.id}`,
      });
      return res.status(200).json(movie.data);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

module.exports = MovieController;