import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/auth.js';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/create').post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .post(protect, createProductReview)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
