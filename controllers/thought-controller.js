const { Thought, User } = require('../models');

// this is a thoughtController object, containing two methods for adding and removing thoughts
const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .sort({ _id: -1 }) // this will sort by id value
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get single thought by Id
    getThoughtById({ params }, res) { //here we are desctucturing params out of req 
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'thoughts', //shiould this be user or thoughts?
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //use below "addThought" instead of the one above
    addThought({ params, body }, res) {
        Thought.create(body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } }, // push operator adds reaction to the array
                    { new: true })
            }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json({ message: 'Successful' })
            })
            .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //add reactions here
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } }, // push operator adds reaction to the array
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: body } }, // pull operator removes the thought from the array
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    },

    // remove thought. first we delete the thought (while also returning it's data), then we'll use its _id to remove it from the user using $pull 

    removeThought({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { thoughts: params.thoughtId } }, // pull operator removes from the array
            { new: true }
        )
            .then(dbUserData =>
                res.json(dbUserData))
            .catch(err => res.json(err));
    },

};
module.exports = thoughtController;