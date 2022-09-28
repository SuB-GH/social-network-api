const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought 


} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
    //.get(getAllThoughts) //GET to get all thoughts

    .route('/:userId/:thoughtId')
    .delete(removeThought) //DELETE to remove a thought by its _id
    //.get(getThoughtById) // GET to get a single thought by its _id
    .post(addThought) //POST to create a new thought, example below:
    // {
    //     "thoughtText": "Here's a cool thought...",
    //     "username": "lernantino",
    //     "userId": "5edff358a0fcb779aa7b118b"
    //   }
    //.put(updateThought); //PUT to update a thought by its _id

    // router.route('/:api/thoughts/:thoughtId/reactions);
    //     .post(createReaction) //POST to create a reaction stored in a single thought's reactions array field
    //     .delete(removeReaction)) //DELETE to pull and remove a reaction by the reaction's reactionId value


router.route('/:userId/:thoughtId/:thoughtId').delete(removeThought);

module.exports = router;



