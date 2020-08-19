const axios = require('axios');
const urlSeries = 'http://localhost:3002/series';
const Redis = require("ioredis");
const redis = new Redis();

class SeriesController {
  static async find(_, res) {
    try {
      let series = await redis.get('series');
      if (series) {
        return res.status(200).json(JSON.parse(series));
      } else {
        series = await axios(`${urlSeries}`);
        redis.set('series', JSON.stringify(series.data), 'EX', 600);
        return res.status(200).json(series.data);
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async findOne(req, res) {
    try {
      const series = await axios(`${urlSeries}/${req.params.id}`);
      return res.status(200).json(series.data);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async insert(req, res) {
    try {
      const series = await axios({
        method: 'POST',
        url: urlSeries,
        data: req.body
      })
      return res.status(201).json(series.data[0]);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async updateOne(req, res) {
    try {
      const series = await axios({
        method: 'PATCH',
        url: `${urlSeries}/${req.params.id}`,
        data: req.body
      })
      return res.status(200).json(series.data);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async deleteOne(req, res) {
    try {
      const series = await axios({
        method: 'DELETE',
        url: `${urlSeries}/${req.params.id}`,
      })
      return res.status(200).json(series.data);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

module.exports = SeriesController;