// required
const router = require('express').Router();

// User routes
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

// api users
router.route('/').get(getAllUsers).post(createUser);

// api user by :id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// api user:id/friends/friendId
router.route('/:id/:friendId').post(addFriend).delete(deleteFriend);

// export user routes
module.exports = router;