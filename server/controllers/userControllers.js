import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
  createActivationToken,
  generateIdToken,
} from '../utils/generateToken.js';
import { sendActivationEmail } from '../utils/sendMail.js';

// Register New User

export const register = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const activationToken = createActivationToken(req.body);
  const url = `${process.env.CLIENT_URI}/user/active/${activationToken}`;

  await sendActivationEmail(email, url);

  res.json({ message: `Account activation email has sent to ${email}` });
});

// User Activation

export const activeUserAccount = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const decodeUser = await jwt.verify(token, process.env.JWT_SECRET);
  const { firstName, lastName, email, password } = decodeUser;

  // Check user if exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Creating new user
  const user = await User.create({ firstName, lastName, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateIdToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// User Login

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateIdToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});
