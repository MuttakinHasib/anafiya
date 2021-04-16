import fs from 'fs';
import asyncHandler from 'express-async-handler';

export const uploader = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400);
    throw new Error('No files were uploaded');
  }

  const file = req.files.avatar || req.files.product;

  const fileTypes = /jpg|jpeg|png|webp/;
  const mimetype = fileTypes.test(file?.mimetype);

  if (!mimetype) {
    removeTemp(file.tempFilePath);
    res.status(400);
    throw new Error('File format not supported');
  }
  next();
});

export const removeTemp = path => {
  fs.unlink(path, err => {
    console.log(err);
  });
};
