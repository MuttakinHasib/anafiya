import express from 'express';
import {
  uploadAvatar,
  uploadProduct,
} from '../controllers/uploadController.js';
import { admin, protect } from '../middleware/auth.js';
import { uploader } from '../middleware/upload.js';

const router = express.Router();

router.route('/avatar').post(protect, uploader, uploadAvatar);
router.route('/product').post(protect, admin, uploader, uploadProduct);

export default router;
