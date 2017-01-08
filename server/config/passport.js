import _ from 'lodash';
import dotenv from 'dotenv';
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LocalStrategy } from 'passport-local';

import User from '../models/user';

dotenv.load({ path: '.env' });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User
    .forge({ id }).fetch()
    .then((user) => {
      done(null, user.toJSON());
    });
});

/**
 * OAuth Strategy Overview
 *
 * - User is already logged in.
 *   - Check if there is an existing account with a provider id.
 *     - If there is, return an error message. (Account merging not supported)
 *     - Else link new OAuth account with currently logged-in user.
 * - User is not logged in.
 *   - Check if it's a returning user.
 *     - If returning user, sign in and we are done.
 *     - Else check if there is an existing account with user's email.
 *       - If there is, return an error message.
 *       - Else create a new account.
 */

 /**
 * Sign in with Google.
 */
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const email = profile.emails[0].value;

  User
    .forge({ email })
    .fetch()
    .then((user) => {
      if (user) {
        done(null, user.toJSON());
      } else {
        new User({
          email,
          google: profile.id,
          enabled: true,
          name: profile.displayName,
          gender: profile._json.gender,
          avatar_url: profile._json.image.url,
        }).save().then((newUser) => {
          done(null, newUser.toJSON());
        });
      }
    });
}));

/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email', 'gender'],
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const email = profile._json.email;

  User
    .forge({
      email,
    }).fetch()
    .then((user) => {
      if (user) {
        done(null, user.toJSON());
      } else {
        new User({
          email,
          facebook: profile.id,
          enabled: true,
          name: profile.displayName,
          gender: profile._json.gender,
          avatar_url: `https://graph.facebook.com/${profile.id}/picture?type=large`,
        }).save().then((newUser) => {
          done(null, newUser.toJSON());
        });
      }
    });
}));

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User
    .forge({
      email: email.toLowerCase(),
    }).fetch()
    .then((user) => {
      if (!user) {
        return done(null, false, { msg: '帳號或密碼錯誤' });
      }

      if (!user.get('enabled')) {
        return done(null, false, { msg: '帳號還沒啟用' });
      }

      // Validate user password
      return user.validatePassword(password, (err, isValid) => {
        if (err) {
          return done(null, false, {
            msg: '帳號或密碼錯誤',
          });
        }

        // If the password was not valid
        if (!isValid) {
          return done(null, false, { msg: '帳號或密碼錯誤' });
        }

        return done(null, user.toJSON());
      });
    });
}));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
