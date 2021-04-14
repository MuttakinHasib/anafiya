import express from 'express';
import { uploadAvatar } from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { uploader } from '../middleware/upload.js';

const router = express.Router();

router.route('/avatar').post(protect, uploader, uploadAvatar);

export default router;
