const {Thought, User} = require('../models');

//getting all thoughts
const getThoughts = async(req, res) => {
    try {
        const thoughtData = await Thought.find({});
        res.json(thoughtData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
};

//getting a single thought by id
const getThought = async(req, res) => {
    try {
        const thoughtData = await Thought.findById(
            { _id: req.params.thoughtId }
        );
        res.json(thoughtData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
};

//creating a new thought
const createThought = async(req, res) => { 
    try {
        const thoughtData = await Thought.create(req.body);
        const userData = await User.findByIdAndUpdate(
            req.body.userId,
            { $addToSet: { thoughts: thoughtData._id } },
            { new: true }
        );
        if(!userData) {
            return res.status(404).json(
                { message: 'Thought created, but found no user with this id!' }
            );
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
};

//updating a thought by id
const updateThought = async(req, res) => {
    try {
        const thoughtData = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId }, 
            { $set: req.body},  
            { new: true, runValidators: true }  
        );
        if(!thoughtData) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thoughtData);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }   
};

//deleting a thought by id  
const deleteThought = async(req, res) => {
    try {
        const thoughtData = await Thought.findByIdAndDelete(
             req.params.thoughtId 
            // { _id: req.params.thoughtId }
        );
        if(!thoughtData) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        // const userData = await User.findByIdAndUpdate(
        const userData = await User.findOneAndUpdate(
            // req.params.thoughtId,
            {thoughts: req.params.thoughtId},
            {$pull: {thoughts: req.params.thoughtId} },
            {new: true}
        );
            
        if(!userData) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json({message: 'Thought successfully deleted!'});
        // res.json(thoughtData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
};

//creating a reaction
const addReaction = async(req, res) => {
    try {
        const thoughtData = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if(!thoughtData) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
};

const deleteReaction = async(req, res) => { 
    try {
        const thoughtData = await Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { new: true, runValidators: true}
        );
        if(!thoughtData) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thoughtData);
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err.message);
    }
}

module.exports = {
    getThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
};


