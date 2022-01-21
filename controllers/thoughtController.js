const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts:
  getThoughts(req, res) {
    Thought.find()
    // Populating the reactions array to see the content;
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought:
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      // Populating the reactions array to see the content;
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID found' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought:
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id.toString() } },
          { new: true }
        ).then((userThoughts) => {
            res.json(userThoughts);
        })
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought:
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID found' })
          : User.deleteMany({ _id: { $in: thought.user } })
      )
      .then(() => res.json({ message: 'Selected thought is deleted' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought:
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    // Populating the reactions array to see the content;
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID found' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add reaction to the thought;
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    // Populating out reactions array;
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought with this ID found' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a specific reaction:
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID found' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
