// create the user controller for the user model
const{User, Thought} = require('../models');

// getting all users
const getUsers = async(req, res) => {
    try {
        const userData = await User.find({});
        res.json(userData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
};

//getting a single user by id
const getUser = async(req, res) => {
    try {
        const userData = await User.findById({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
        res.json(userData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
};

//creating a new user
const createUser = async(req, res) => { 
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
}

//updating a user by id
const updateUser = async(req, res) => {
    try {
        const userData = await User.findByIdAndUpdate(
            { _id: req.params.userId }, 
            { $set: req.body},
            { new: true, runValidators: true }
        );   
        if(!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(userData);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
};

//deleting a user by id
const deleteUser = async(req, res) => {
    try {
        const userData = await User.findByIdAndDelete(
            { _id: req.params.userId }
        );
        if(!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        const userThoughts = await Thought.deleteMany(
            { username: userData.username }
        );
        if(!userThoughts) {
            return res.status(404).json({ message: 'No thoughts found for this user!' });
        }
        res.json({ message: `User with id ${req.params.userId} and associated thoughts deleted!` });
        // res.json(userData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
};

//adding a new friend
//creates a friendship between two users
//adds the friend to the user's friend list
//also adds the user to the friend's friend list
const addFriend = async(req, res) => {
    try {
        //adding a friend to the user
        const userData = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        );
        if(!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }

        //adding the user as a friend to the friend
        const friendData = await User.findByIdAndUpdate(
            { _id: req.params.friendId },
            { $addToSet: { friends: req.params.userId } },
            { new: true, runValidators: true }
        );
        if(!friendData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json({userData, friendData});
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
};

//removes the friend from the user's friend list
//also removes the user from the friend's friend list
const deleteFriend = async(req, res) => {
    try {
        //removing the friend from the user's friend list
        const userData = await User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true}
        );
        if(!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        //removing the user from the friend's friend list
        const friendData = await User.findByIdAndUpdate(
            { _id: req.params.friendId },
            { $pull: { friends: req.params.userId } },
            { new: true}
        );
        if (!friendData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        };

        res.json({userData, friendData});
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
}

//exporting the user controller
module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
};
