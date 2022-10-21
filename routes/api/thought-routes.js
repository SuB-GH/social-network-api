const router = require('express').Router();
const {
    // Thought routes
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,

    // Reaction routes
    addReaction,
    deleteReaction,

} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/').get(getAllThoughts).post(addThought); //GET all thoughts & CREATE thought - THESE WORK!
router.route('/:thoughtId/:userId').delete(removeThought) //remove a thought and update a thought
router.route('/:thoughtId').put(updateThought)
router.route('/:thoughtId').get(getThoughtById) // get a single thought by it's id

//router.route('/:api/thoughts/:thoughtId/reactions);
router.route('/:thoughtId/:reactionId').post(addReaction); //POST to create a reaction stored in a single thought's reactions array field
router.route('/:thoughtId/:reactionId').delete(deleteReaction) //DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = router;



