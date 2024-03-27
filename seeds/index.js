const connectionToDB = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./userData.json');
const thoughtData = require('./thoughtData.json');
const friendsData = require('./friendsData.json');

connectionToDB.once('open', async () => {
  console.log('Seeding the database...');

  //creating the database collection objects
  const thoughtCheck = await connectionToDB.db.listCollections({ name: 'thoughts' }).toArray();
  const userCheck = await connectionToDB.db.listCollections({ name: 'users' }).toArray();

  // Drop the collections if they exist
  if (thoughtCheck.length) {
    await connectionToDB.dropCollection('thoughts');
    console.log('thoughts collection dropped');
  }
  if (userCheck.length) {
    await connectionToDB.dropCollection('users');
    console.log('users collection dropped');
  }

  //creating the users collection objects
  for (const user of userData) {
    await User.create(user);
  }

//creating the thoughts collection objects
  for (const thought of thoughtData) {
    const newThought = await Thought.create(thought);
    const username = thought.username;

    //updating the users collection with the thoughts
    const user = await User.findOneAndUpdate(
      { username: username },
      { $push: { thoughts: newThought._id } },
      { new: true },
    );
    if (!user) {
      console.log(`No user found with username ${username}`);
    }
  }

  //updating the users collection with the friends
  for (const { username, friends } of friendsData) {
    const friend_ids = [];

    //populate the friend_ids array with the user ids of the friends
    for (const friend of friends) {
      const user = await User.findOne({ username: friend });

      if (!user) {
        console.log(`No user found with username ${friend}`);
      } else {
        friend_ids.push(user._id);
      }
    }
    //update the user's friends list with the friend_ids array
    const user = await User.findOneAndUpdate(
      { username: username },
      { $addToSet: { friends: friend_ids } },
      { new: true },
    );
    if (!user) {
      console.log(`No user found with username ${username}`);
    }
  }
    console.log('Database seeded successfully!');
    process.exit(0);
});
