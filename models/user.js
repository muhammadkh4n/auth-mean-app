const bcrypt = require('bcryptjs');
const config = require('../config/database');
const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Export Schema
const User = module.exports = mongoose.model('User', UserSchema);


// Find user by id
module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

// Find user by username
module.exports.getUserByUsername = (username, callback) => {
  const query = {username: username};
  User.findOne(query, callback);
};

// Add User. using bcrypt to encrypt password
module.exports.addUser = (user, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save(callback);
    });
  });
};

// Compares password with hash password in db
module.exports.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};