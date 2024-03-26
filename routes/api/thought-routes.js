// Import the Express router to create a new router instance
const router = require('express').Router();

// Import the thought controller
const {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// The `/api/thoughts` endpoint
router.route('/')
    .get(getThoughts)
    .post(createThought);

// The `/api/thoughts/:thoughtId` endpoint
router.route('/:thoughtId')
    .get(getThought)
    .put(updateThought)
    .delete(deleteThought);

// The `/api/thoughts/:thoughtId/reactions` endpoint
router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);


// Export the router for use in other parts of the application
module.exports = router;
