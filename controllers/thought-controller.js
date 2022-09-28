const { Thought, User } = require('../models');

// this is a thoughtController object, containing two methods for adding and removing thoughts
const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ // this shows the actual thought, not just the id
                path: 'thoughts', // is it singular or plural?
                select: '-__v'
            })
            .select('-__v')
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

    // add thought to user. the $push method (adds data to an array) and allows us to add the thought's _id to the specific user we want to update. (MongoDB-based functions start with $ to make them stand out)
    addThought({ body }, res) {
        console.log(body);
        Thought.create(body)
            .then(dbThoughtData =>
                res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, body,
            { $push: { replies: body } },
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

        // remove thought. first we delete the thought (while also returning it's data), then we'll use its _id to remove it from the user using $pull 
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } }, // $pull operator removes the specific thought from the replies array where the thoughtId matches the value of params.thoughtId passed in from the route
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    }
};
module.exports = thoughtController;