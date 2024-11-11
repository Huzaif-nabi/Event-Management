// config/passportConfig.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Adjust the path according to your project structure
const dotenv = require('dotenv');
const LocalStrategy = require('passport-local').Strategy;

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback' // Ensure this matches what you have in your Google API settings
}, async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ googleId: profile.id });
    if (user) {
        return done(null, user);
    } else {
        const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
        });
        user = await newUser.save();
        return done(null, user);
    }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Local strategy for username and password login
passport.use(new LocalStrategy(
  async (username, password, done) => {
      try {
          const user = await User.findOne({ email: username });
          if (!user || !await user.isValidPassword(password)) {
              return done(null, false, { message: 'Incorrect username or password.' });
          }
          return done(null, user);
      } catch (error) {
          return done(error);
      }
  }
));
//end new
module.exports = passport;
