const { Schema, model, Types } = require('mongoose'); // this only imports the schema constructor and model function - do i need anything else?
const dateFormat = require('../utils/dateFormat'); //use moment instead?

//complete reaction schema here...
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 280
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal) //getter method to format the timestamp
        }
    })

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

        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },

        // is the syntax below correct?
        reactions: [ReactionSchema],
    },
    // Array of nested documents created with the reactionSchema
    // Schema Settings
    // Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

// tallies up the number of Thoughts' friends
ThoughtSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;