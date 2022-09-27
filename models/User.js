const { Schema, model } = require('mongoose'); // this only imports the schema constructor and model function - do i need anything else?
const dateFormat = require('../utils/dateFormat');


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
            validate: {
                validator: () => Promise.resolve(false),
                message: 'Email validation failed'
            }
        },
        // is the syntax below correct?
        thoughts: [],
        // the "parent" User, is associated with "child" thoughts here. ref tells it to search the Thought document
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],

        // is the syntax below correct?
        friends: [],
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
            // getters: true
        },
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