// import required
const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

// generate user schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'We need your username here please and thanks.',
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      // mongoose email validation
      match: [
        /.+@.+\..+/,
        "C'mon, give us something valid. We have to know where to send your spam email.",
      ],
    },

    // reference Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    // reference User model to generate friends array
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    // virtuals & getters
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // omit id
    id: false,
  }
);

// generate friend totals
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

UserSchema.pre("remove", function (next) {
  Thought.remove({ username: this.username }).exec();
  next();
});

// define user model
const User = model('User', UserSchema);

// export User model
module.exports = User;