const Series = require('../models/Series');

class SeriesController {
  static async find(_, res) {
    try {
      const series = await Series.find();
      return res.status(200).json(series);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async findOne(req, res) {
    try {
      const series = await Series.findOne(req.params.id);
      console.log(series, "<<<< series");
      return res.status(200).json(series);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async insert(req, res) {
    try {
      const series = await Series.insert(req.body);
      return res.status(201).json(series.ops);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async updateOne(req, res) {
    try {
      const series = await Series.updateOne(req.params.id, req.body);
      return res.status(200).json(series.value);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async deleteOne(req, res) {
    try {
      const series = await Series.deleteOne(req.params.id);
      return res.status(200).json(series.value);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

module.exports = SeriesController;