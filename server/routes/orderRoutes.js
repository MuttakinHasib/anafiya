import express from 'express';
import {
  addOrderItems,
  getOrderById,
  getOrders,
  getUserOrders,
  stripePayment,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/auth.js';
const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/userOrders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/payment').post(protect, stripePayment);
router.route('/:id/paid').post(protect, updateOrderToPaid);
router.route('/:id/delivered').put(protect, admin, updateOrderToDelivered);

export default router;
