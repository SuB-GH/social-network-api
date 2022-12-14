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

        userName: {
            type: String,
            required: true,
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

        userName: {
            type: String,
            required: true,
        },

        // is the syntax below correct?
        reactions: [ReactionSchema],
    },
   
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

// tallies up the number of Thoughts' reactions
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;