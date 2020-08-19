const router = require('express').Router();
const SeriesController = require('../controllers/SeriesController');

router.get('/series', SeriesController.find);
router.post('/series', SeriesController.insert);
router.get('/series/:id', SeriesController.findOne);
router.patch('/series/:id', SeriesController.updateOne);
router.delete('/series/:id', SeriesController.deleteOne);

module.exports = router;