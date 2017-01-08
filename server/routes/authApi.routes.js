import { Router } from 'express';
import * as AuthController from '../controllers/auth.controller';

const router = new Router();

router.get('/user', AuthController.getCurrentUser);
router.get('/logout', AuthController.logout);
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

export default router;
