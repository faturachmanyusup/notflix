const router = require('express').Router();
const moviesRoutes = require('./moviesRoutes');
const seriesRoutes = require('./seriesRoutes');
const axios = require('axios');
const Redis = require("ioredis");
const redis = new Redis();

router.use('/movies', moviesRoutes);
router.use('/series', seriesRoutes);

router.get('/entertaintme', async (req, res) => {
  let entertaintme = await redis.get('entertaintme');
  if (entertaintme) {
    return res.status(200).json(JSON.parse(entertaintme));
  } else {
    const movies = await axios('http://localhost:3001/movies');
    const series = await axios('http://localhost:3002/series');
    entertaintme = {
      movies: movies.data,
      series: series.data
    }
    await redis.set('entertaintme', JSON.stringify(entertaintme, 'EX', 600));
    return res.status(200).json(entertaintme);
  }
})

module.exports = router;