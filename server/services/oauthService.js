const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLECLIENT,
      clientSecret: process.env.GOOGLESECRET,
      callbackURL: '/auth/google/callback', // This is the route the user takes after OAuth from Google
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        email: profile.emails[0].value
      });
      if (existingUser) {
        // Check if user previously logged-in with another o-auth provider
        if (!existingUser.googleId) {
          existingUser.googleId = profile.id;
          await existingUser.save();
        }
        return done(null, existingUser);
      }
      const user = await new User({
        first: profile.name.givenName,
        last: profile.name.familyName,
        googleId: profile.id,
        email: profile.emails[0].value
      }).save();

      done(null, user);
    }
  )
);
