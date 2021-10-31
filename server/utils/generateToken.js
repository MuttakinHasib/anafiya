import jwt from 'jsonwebtoken';

export const generateIdToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const createActivationToken = payload =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' });

export const createAccessToken = payload =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
