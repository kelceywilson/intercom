const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // If users exists, go ahead, else create new user
      User.findOne({ googleID: profile.id }).then(user => {
        if (user) {
          done(null, user);
        } else {
          new User({ googleID: profile.id })
            .save()
            .then(newUser => done(null, newUser));
        }
      });
    }
  )
);
