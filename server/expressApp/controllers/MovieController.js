const Movie = require('../models/Movie');

class MovieController {
  static async find(_, res) {
    try {
      const movies = await Movie.find();
      return res.status(200).json(movies);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async findOne(req, res) {
    try {
      const movie = await Movie.findOne(req.params.id);
      return res.status(200).json(movie[0]);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async insert(req, res) {
    try {
      const movie = await Movie.insert(req.body);
      return res.status(201).json(movie.ops);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async updateOne(req, res) {
    try {
      const movie = await Movie.updateOne(req.params.id, req.body);
      return res.status(200).json(movie.value);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async deleteOne(req, res) {
    try {
      const movie = await Movie.deleteOne(req.params.id);
      return res.status(200).json(movie.value);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

module.exports = MovieController;