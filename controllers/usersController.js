const { ObjectId } = require("mongoose").Types;
const { Users, Thought } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    Users.find()
      .then(async (users) => {
        const usersObj = {
          users,
        };
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single users
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.usersId })
      .select("-__v")
      .then(async (users) =>
        !users
          ? res.status(404).json({ message: "No users with that ID" })
          : res.json(users)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new users
  createusers(req, res) {
    Users.create(req.body)
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a users and remove them from the course
  deleteusers(req, res) {
    Users.findOneAndRemove({ _id: req.params.usersId }).then((users) => {
      !users
        ? res.status(404).json({ message: "No such users exists" })
        : Thought.deleteMany({ _id: { $in: users.thought } })
            .then((userThoughts) =>
              !userThoughts
                ? res.status(404).json({
                    message: "users deleted, but no thoughts found",
                  })
                : res.json({ message: "thoughts successfully deleted" })
            )
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
            });
    });
  },

  // Add an assignment to a users
  addFriend(req, res) {
    console.log("You are adding an assignment");
    console.log(req.body);
    Users.findOneAndUpdate(
      { _id: req.params.usersId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((users) =>
        !users
          ? res.status(404).json({ message: "No users found with that ID :(" })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a users
  removeFriend(req, res) {
    Users
      .findOneAndUpdate(
        { _id: req.params.usersId },
        { $pull: { assignment: req.params.friendId } },
        { runValidators: true, new: true }
      )
      .then((users) =>
        !users
          ? res.status(404).json({ message: "No users found with that ID :(" })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
};
