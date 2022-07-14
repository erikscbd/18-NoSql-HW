const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createusers,
  deleteusers,
  addFriend,
  removeFriend,
} = require('../../controllers/usersController');

// /api/users
router.route('/').get(getUsers).post(createusers);

// /api/users/:userId
router.route('/:usersId').get(getSingleUser).delete(deleteusers);

// /api/students/:studentId/assignments
// router.route('/:usersId/friends')

// /api/students/:usersId/friends/:friendId
router.route('/:usersId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;
