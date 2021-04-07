import express from 'express';
import {
  activeUserAccount,
  facebookAuth,
  googleAuth,
  login,
  register,
} from '../controllers/userControllers.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/activation', activeUserAccount);

// Social Login
router.post('/googleSignIn', googleAuth);
router.post('/facebookSignIn', facebookAuth);

export default router;
