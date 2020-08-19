const router = require('express').Router();
const MovieController = require('../controllers/MovieController');

router.get('/', MovieController.find);
router.post('/', MovieController.insert);
router.get('/:id', MovieController.findOne);
router.patch('/:id', MovieController.updateOne);
router.delete('/:id', MovieController.deleteOne);

module.exports = router;