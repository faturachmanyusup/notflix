const router = require('express').Router();
const moviesRoutes = require('./moviesRoutes');
const seriesRoutes = require('./seriesRoutes');

router.use('/movies', moviesRoutes);
router.use('/series', seriesRoutes);

module.exports = router;