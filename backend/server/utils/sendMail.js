import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { orderTables } from './htmlContent.js';
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  ADMIN_EMAIL,
} = process.env;

const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

export const sendActivationEmail = (to, url) => {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: ADMIN_EMAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: `Anafiya < ${ADMIN_EMAIL}>`,
    to,
    subject: 'Anafiya || Account Activation Link',
    html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase;color: #7C3BED;">Welcome to Anafiya Islamic Online Shop</h2>
      <p>Congratulations! Just click the button below to validate your email address.
      </p>
      
     <div style="text-align: center;"><a href="${url}" style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px auto; display: inline-block;">Click here to verify</a></div>

      <p>If the button doesn't work for any reason, you can also click on the link below:</p>

      <div>${url}</div>
    </div>
    `,
  };

  const emailSend = transporter.sendMail(mailOptions);
  if (!emailSend) {
    res.status(400);
    throw new Error('Something went wrong');
  }
};

export const sendOrderCreateEmail = order => {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: ADMIN_EMAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: `Anafiya < ${ADMIN_EMAIL}>`,
    to: `${order?.shippingAddress?.name} < ${order?.shippingAddress?.email}>`,
    subject: `Anafiya - Order No# ${order._id}`,
    text:
      'Thank you for your interest in Proshop products. Your order has been received and will be processed once payment has been confirmed.', // plain text body
    html: `
      <div style='margin-bottom: 10px;'>
        <h4>Thank you for your interest in Proshop products. . Your order has been received and will be processed once payment has been confirmed.</h4>
      </div>
      ${orderTables(order)}
    `,
  };

  const emailSend = transporter.sendMail(mailOptions);
  if (!emailSend) {
    // res.status(400);
    throw new Error('Something went wrong');
  }
};

export const sendOrderCreateEmailToAdmin = order => {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: ADMIN_EMAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: `Anafiya < ${ADMIN_EMAIL}>`,
    to: `Anafiya < ${ADMIN_EMAIL}>`,
    subject: `Anafiya - New Order No# ${order._id}`,

    html: `
      <div style='margin-bottom: 10px;'>
        <h4>Got new order from ${order.shippingAddress?.name}, Order No# ${
      order._id
    }.</h4>
      </div>
      ${orderTables(order)}
    `,
  };

  const emailSend = transporter.sendMail(mailOptions);
  if (!emailSend) {
    // res.status(400);
    throw new Error('Something went wrong');
  }
};

export const sendOrderPaidEmail = order => {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: ADMIN_EMAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: `Anafiya < ${ADMIN_EMAIL}>`,
    to: `${order?.shippingAddress?.name} < ${order?.shippingAddress?.email}>`,
    subject: `Payment Received - Order No# ${order._id} & Transaction ID ${order.paymentResult.id}`, // Subject line
    html: `
        <div style='margin-bottom: 10px;'>
          <h2>Received payment at ${order.paidAt}</h2>
          <h4>Payment Information</h4>
          <p>Card Type: ${order.paymentMethod}</p>
          <p>Transaction Type: Purchase</p>
          <p>Gateway Currency: USD</p>
          <p><b>Total Amount:</b> $${order.totalPrice}</p>
        </div>
      ${orderTables(order)}
    `,
  };

  const emailSend = transporter.sendMail(mailOptions);
  if (!emailSend) {
    // res.status(400);
    throw new Error('Something went wrong');
  }
};

export const sendOrderPaidEmailToAdmin = order => {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: ADMIN_EMAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: `Anafiya < ${ADMIN_EMAIL}>`,
    to: `Anafiya < ${ADMIN_EMAIL}>`,
    subject: `Payment Received - Order No# ${order._id} & Transaction ID ${order.paymentResult.id}`, // Subject line
    text: `We received your payment at ${order.paidAt}`, // plain text body
    html: `
        <div style='margin-bottom: 10px;'>
          <h2>We received your payment at ${order.paidAt}</h2>
          <h4>Payment Information</h4>
          <p>Card Type: ${order.paymentMethod}</p>
          <p>Transaction Type: Purchase</p>
          <p>Gateway Currency: USD</p>
          <p><b>Total Amount:</b> $${order.totalPrice}</p>
        </div>
      ${orderTables(order)}
    `,
  };

  const emailSend = transporter.sendMail(mailOptions);
  if (!emailSend) {
    // res.status(400);
    throw new Error('Something went wrong');
  }
};

export const sendOrderDeliveredEmail = order => {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: ADMIN_EMAIL,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: `Anafiya < ${ADMIN_EMAIL}>`,
    to: `${order?.shippingAddress?.name} < ${order?.shippingAddress?.email}>`,
    subject: `Anafiya || Order Delivered - Order No# ${order._id}`, // Subject line
    text: 'Your order has been delivered.', // plain text body
    html: `
      <div style='margin-bottom: 10px;'>
        <h2>Your order has been delivered at ${order.deliveredAt}</h2>
      </div>
      ${orderTables(order)}
    `,
  };

  const emailSend = transporter.sendMail(mailOptions);
  if (!emailSend) {
    // res.status(400);
    throw new Error('Something went wrong');
  }
};
