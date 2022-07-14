const { Schema, model } = require('mongoose');

// Schema to create a course model
const usersSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,

    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref:'thought',
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      // Sets a default value of 12 weeks from now
      ref: 'users'
    }],
   
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

usersSchema.virtual('friendsCount').get(function(){
  return this.friends.length;
})

const Users = model('users', usersSchema);

module.exports = Users;
