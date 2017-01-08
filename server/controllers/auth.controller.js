import passport from 'passport';
import jwt from 'jsonwebtoken';
import hasher from 'password-hash';
import auth from '../config/auth';
import User from '../models/user';
/**
 * Get a current user
 * @param req
 * @param res
 * @returns void
 */

export function getCurrentUser(req, res) {
  res.json({ user: req.user });
}

export function register(req, res, next) {
  const { name, email, password } = req.body;

  User
    .forge({
      email,
    }).fetch()
    .then((user) => {
      if (user) {
        return res.status(401).json({
          error: {
            msg: '使用者已經存在',
          },
        });
      }

      const encrypted_password = hasher.generate(password);

      new User({
        email,
        name,
        encrypted_password,
        enabled: true,
      }).save().then((newUser) => {
        const expiresIn = 60 * 60 * 24 * 180; // 180 days
        const token = jwt.sign(newUser, auth.jwt.secret, { expiresIn });
        return res.json({ token, user: newUser });
      });
    });
}

export function login(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: info });
    }

    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(user, auth.jwt.secret, { expiresIn });
    return res.json({ token, user });
  })(req, res, next);
}

export function logout(req, res) {
  req.logout();
  res.json({ user: {} });
}
