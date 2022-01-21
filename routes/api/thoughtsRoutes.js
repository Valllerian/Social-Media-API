const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// Route for /api/thoughts to get all thoughts all create a new one;
router.route('/').get(getThoughts).post(createThought);

// Route for /api/thoughts/:thoughtId to get a specific thought, update or delete one;
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Route for /api/thoughts/:thoughtId/reactions to add a reaction; 
router.route('/:thoughtId/reactions').post(addReaction);

// Route for /api/thoughts/:thoughtId/reactions to delete a specific reaction; 
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
