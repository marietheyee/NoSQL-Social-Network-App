
const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {

    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: 'No really. We really wanna hear what you have to say.',
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    username: {
      type: String,
      required: 'Gotta know your username. Please enter it here.',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {

    toJSON: {
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You gotta enter a thought.',
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: 'We have to know your username.',
    },

    reactions: [ReactionSchema],
  },
  {
  
    toJSON: {
      virtuals: true,
      getters: true,
    },
  
    id: false,
  }
);


ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;