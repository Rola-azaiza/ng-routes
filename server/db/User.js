// npm packages
const { isEmail } = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [isEmail, 'invalid email' ]
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

userSchema.pre('save', function (next) {
  const user = this;
  try {
    // hash user password
    const salt = bcrypt.genSaltSync(10, user.password);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = function (condidatePassword, callback) {
  bcrypt.compare(condidatePassword, this.password, (err, isMatch) => {
    if (err) callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
