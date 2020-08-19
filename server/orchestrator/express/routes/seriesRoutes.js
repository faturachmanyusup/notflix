const router = require('express').Router();
const SeriesController = require('../controllers/SeriesController');

router.get('/', SeriesController.find);
router.post('/', SeriesController.insert);
router.get('/:id', SeriesController.findOne);
router.patch('/:id', SeriesController.updateOne);
router.delete('/:id', SeriesController.deleteOne);

module.exports = router;