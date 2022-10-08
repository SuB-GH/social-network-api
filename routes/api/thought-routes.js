const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    deleteReaction,


} = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
router.route('/:userId').post(addThought);


router.route('/:thoughtId').delete(removeThought) //DELETE to remove a thought by its _id
//.get(getThoughtById) // GET to get a single thought by its _id
//POST to create a new thought, example below:
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
//   }
//.put(updateThought); //PUT to update a thought by its _id

// router.route('/:api/thoughts/:thoughtId/reactions);
//     .post(createReaction) //POST to create a reaction stored in a single thought's reactions array field
//     .delete(removeReaction)) //DELETE to pull and remove a reaction by the reaction's reactionId value


module.exports = router;



