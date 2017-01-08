import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import auth from '../config/auth';

const router = new Router();

router.get('/google', passport.authenticate('google', { scope: ['profile email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
  res.cookie('id_token', token, { maxAge: 1000 * expiresIn });
  res.redirect('/');
});

router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days
  const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
  res.cookie('id_token', token, { maxAge: 1000 * expiresIn });
  res.redirect('/');
});

export default router;
