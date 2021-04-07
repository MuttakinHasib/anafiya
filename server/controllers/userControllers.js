import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import User from '../models/User.js';
import {
  createActivationToken,
  generateIdToken,
} from '../utils/generateToken.js';
import { sendActivationEmail } from '../utils/sendMail.js';

const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.GOOGLE_CLIENT_ID);
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

// Google Login

export const googleAuth = asyncHandler(async (req, res) => {
  const { idToken } = req.body;
  const verify = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  console.log(verify);
  const { given_name, email, email_verified, picture } = verify.payload;

  if (email_verified) {
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user?.lastName,
        avatar: user.avatar,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateIdToken(user._id),
      });
    } else {
      const lastName = verify.payload.family_name
        ? verify.payload.family_name
        : '';
      const newUser = await User.create({
        firstName: given_name,
        lastName,
        email,
        avatar: picture,
        password: email + process.env.GOOGLE_CLIENT_ID,
      });
      if (newUser) {
        res.json({
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser?.lastName,
          avatar: newUser.avatar,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: generateIdToken(newUser._id),
        });
      }
    }
  } else {
    res.status(400);
    throw new Error('Google sign in failed');
  }
});
