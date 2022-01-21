const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// Route for /api/users to get user list or create a user;
router.route('/').get(getUsers).post(createUser);

// Route for /api/users/:userId to get a specific user  or delete a user;
router.route('/:userId').get(getUser).delete(deleteUser);

// Route for /api/users/:userId/friends to add a friend;
router.route('/:userId/friends').post(addFriend);

// Route for /api/users/:userId/friends/:friendId to delete a friend;
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;
