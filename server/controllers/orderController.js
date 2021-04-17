import Stripe from 'stripe';
import { v4 as uuid } from 'uuid';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import {
  sendOrderCreateEmail,
  sendOrderPaidEmail,
  sendOrderDeliveredEmail,
  sendOrderPaidEmailToAdmin,
  sendOrderCreateEmailToAdmin,
} from '../utils/sendMail.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }
  
  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  }).populate('user', 'name email');

  const createdOrder = await order.save();

  sendOrderCreateEmail(createdOrder);
  sendOrderCreateEmailToAdmin(createdOrder);

  res.json(createdOrder);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json(order);
});

export const stripePayment = asyncHandler(async (req, res) => {
  const { amount, token } = req.body;
  const idempotencyKey = uuid();

  const payment = await stripe.charges.create(
    {
      source: token.id,
      amount,
      currency: 'usd',
      receipt_email: token.email,
      description: `Total price ${amount}`,
    },
    { idempotencyKey }
  );
  if (payment) {
    res.json({
      id: payment.id,
      status: payment.status,
      email_address: payment.receipt_email,
    });
  } else {
    res.status(400);
    throw new Error('Something went wrong');
  }
});

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    email_address: req.body.email_address,
  };

  const updatedOrder = await order.save();
  sendOrderPaidEmail(updatedOrder);
  sendOrderPaidEmailToAdmin(updatedOrder);
  res.json(updatedOrder);
});

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    sendOrderDeliveredEmail(updatedOrder);

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});
