const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const validate = function(email){
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email)
}

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validate, 'A valid email is required'],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought'}], 
    friends:  [{ type: Schema.Types.ObjectId, ref: 'User'}], 
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Virtual that retrieves the length of the friends array to this User;


userSchema.virtual("friendCount").get(function() {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
