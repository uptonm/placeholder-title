const passport = require('passport');
const express = require('express');
const router = express.Router();
// User attempts to login, begin the oAuth flow
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/'); // User logs in, send them to the dashboard
});

router.get('/api/current_user', (req, res) => {
  if (req.user) {
    // Does user exist?/ are they logged in?
    res.send(req.user);
  } else {
    res.send({ status: 'logged-out' });
  }
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/'); // User logs out, bring them back to the home page
});

module.exports = router;
