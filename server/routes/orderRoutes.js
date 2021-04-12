import express from 'express';
import {
  addOrderItems,
  getOrderById,
  getUserOrders,
  stripePayment,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/userOrders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/payment').post(protect, stripePayment);
router.route('/:id/paid').post(protect, updateOrderToPaid);

export default router;
