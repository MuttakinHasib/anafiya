import express from 'express';
import {
  activeUserAccount,
  login,
  register,
} from '../controllers/userControllers.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/activation', activeUserAccount);

export default router;
