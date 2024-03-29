const {Schema, model} = require('mongoose');
const dayjs = require('dayjs');
//importing the advanced format plugin
var AdvancedFormat = require('dayjs/plugin/advancedFormat');

const reactionSchema = require('./Reaction');
//using the advanced format plugin
dayjs.extend(AdvancedFormat);

//formatting the date and time
const formatDateTime = dt=>{
    return dayjs(dt).format('MMM Do, YYYY [at] hh:mm a');
};
//capitalize the first letter of the username and lowercase the rest
const capitalizeUsername = username =>{
    return  username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
};

//creating thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'thought is required'],
        trim: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // default: () =>Date.now(),
        immutable: true,
        get: formatDateTime
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        // unique: true,
        trim: true,
        validate: {
            validator: input=>{
                const regex= /^[a-zA-Z]\w{5,29}$/;
                return regex.test(input);
            },
            message: props => `${props.value} is not a valid username!`
        },
        set: capitalizeUsername
    },
    reactions:[reactionSchema]
},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    virtuals: {
        reactionCount: {
            get(){
                return this.reactions.length;
            }
        }
    },
    id: false
});

const Thought = model('thought', thoughtSchema);
module.exports= Thought;
