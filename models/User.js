const { Schema, model } = require('mongoose'); // this only imports the schema constructor and model function - do i need anything else?
const dateFormat = require('../utils/dateFormat'); //use moment instead?

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
            
        },
        // the "parent" User, is associated with "child" thoughts here. ref tells it to search the Thought document
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        // the "parent" User, is associated with "child" friends here. ref tells it to search the User document
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// tallies up the number of users' friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;