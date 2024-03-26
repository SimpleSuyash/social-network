// Import the Express router to create a new router instance
const router = require('express').Router();

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// The `/api/users` endpoint
router.route('/')
    .get(getUsers)
    .post(createUser);

// The `/api/users/:userId` endpoint
router.route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

// The `/api/users/:userId/friends/:friendId` endpoint
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

// Export the router for use in other parts of the application
module.exports = router;
