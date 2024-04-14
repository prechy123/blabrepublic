const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          const emailRegex = /^\S+@\S+\.\S+$/;
          if (!emailRegex.test(value)) {
            throw new Error('Invalid email format. Please enter a valid email address.');
          }
          return true;
        }
      }
    },
    password: {
      type: String,
      required: true
    },

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'admin', 'master'],
        default: 'user',
        required: true
    },
    img: {
      type: String,
      required: false
    }
  }, {
    timestamps: true
});
  
  module.exports = mongoose.model('User', userSchema);