const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const salts = parseInt(process.env.SALT_ROUNDS);

const loginStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, pass, done) => {
    try {
      email = email.trim().toLowerCase();
      // get user
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      }

      // check password
      const isCorrectPass = await bcrypt.compare(pass, user.password);
      if (!isCorrectPass) {
        return done(null, false);
      }

      // return user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

// serialize user into user id
function loginSerialize(user, done) {
  return done(null, user._id.toString());
}

// deserialize by fetching user
async function loginDeserialize(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
}

module.exports = {
    loginDeserialize,
    loginSerialize,
    loginStrategy,
}
