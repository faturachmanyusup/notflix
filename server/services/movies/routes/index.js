const router = require('express').Router();
const MovieController = require('../controllers/MovieController');

router.get('/movies', MovieController.find);
router.post('/movies', MovieController.insert);
router.get('/movies/:id', MovieController.findOne);
router.patch('/movies/:id', MovieController.updateOne);
router.delete('/movies/:id', MovieController.deleteOne);

module.exports = router;