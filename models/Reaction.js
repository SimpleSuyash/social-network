const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs');
//importing the advanced format plugin
var AdvancedFormat = require('dayjs/plugin/advancedFormat');
//using the advanced format plugin
dayjs.extend(AdvancedFormat);

//formatting the date and time
const formatDateTime = (dt) => {
  return dayjs(dt).format('MMM Do, YYYY [at] hh:mm a');
};
//capitalize the first letter of the username and lowercase the rest
const capitalizeUsername = (username) => {
  return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
};

//creating reaction schema
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: [true, 'Reaction is required'],
      trim: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      // unique: true,
      trim: true,
      validate: {
        validator: (input) => {
          const regex = /^[a-zA-Z]\w{5,29}$/;
          return regex.test(input);
        },
        message: (props) => `${props.value} is not a valid username!`,
      },
      set: capitalizeUsername,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDateTime,
      // get: createdAt =>formatDateTime(createdAt)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    _id: false,
  },
);

module.exports = reactionSchema;
