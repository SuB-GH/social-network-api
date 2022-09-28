const { Thought, User } = require('../models');

// this is a thoughtController object, containing two methods for adding and removing thoughts
const thoughtController = {
    // add thought to user. the $push method (adds data to an array) and allows us to add the thought's _id to the specific user we want to update. (MongoDB-based functions start with $ to make them stand out)
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    addThought({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { replies: body } },
          { new: true, runValidators: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

      // remove thought
removeThought({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
// $pull operator removes the specific thought from the replies array where the thoughtId matches the value of params.thoughtId passed in from the route
      { $pull: { replies: { thoughtId: params.thoughtId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

    // remove thought. first we delete the thought (while also returning it's data), then we'll use its _id to remove it from the user using $pull 
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }
};
module.exports = thoughtController;