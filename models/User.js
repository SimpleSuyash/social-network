const {Schema, model} = require('mongoose');

//capitalize the first letter of the username and lowercase the rest
const capitalizeUsername = username =>{
    return  username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
};

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        validate: {
            validator: input => {
                const regex= /^[a-zA-Z]\w{5,29}$/;
                return regex.test(input);
            },
            message: props => `${props.value} is not a valid username!`
        },
        set: capitalizeUsername
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        // set: v => v.toLowerCase(),
        validate: {
            validator: input =>{
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return regex.test(input);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    thoughts: [{
        type:Schema.Types.ObjectId,
        ref: 'thought',
        unique: [true, 'The Thought is already added']
    }],
    friends: [{
        type:Schema.Types.ObjectId,
        ref: 'user',
        unique: [true, 'The Friend is already added']
    }]
},
{
    virtuals:{
        friendCount:{ 
            get(){
                return this.friends.length;
            }
        }
    },
    toJSON:{
        virtuals: true,
    }, 
    id: false
}
);
/*
userSchema.pre("save", function(next){
    username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
    next();
});
*/

const User = model('user', userSchema);
module.exports= User;