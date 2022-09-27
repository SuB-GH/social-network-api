const { Schema, model, Types } = require('mongoose'); // this only imports the schema constructor and model function - do i need anything else?
const dateFormat = require('../utils/dateFormat');


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },

        username: {
            type: String,
            required: true,
        },

        // is the syntax below correct?
        reactions: [],
        // Array of nested documents created with the reactionSchema
        // Schema Settings
        // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.


        // is the syntax below correct?
        friends: [],
        // the "parent" Thought, is associated with "child" friends here. ref tells it to search the Thought document
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
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


// tallies up the number of Thoughts' friends
ThoughtSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;