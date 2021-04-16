import fs from 'fs';
import asyncHandler from 'express-async-handler';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const removeTemp = path => {
  fs.unlink(path, err => {
    console.log(err);
  });
};

// Upload Avatar
export const uploadAvatar = asyncHandler(async (req, res) => {
  const file = req.files.avatar;

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'avatar',
  });

  if (result) {
    removeTemp(file.tempFilePath);
    res.json({ url: result.secure_url });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});

// Upload Product Image
export const uploadProduct = asyncHandler(async (req, res) => {
  const file = req.files.product;

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: 'products',
  });

  if (result) {
    removeTemp(file.tempFilePath);
    res.json({ url: result.secure_url });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});
