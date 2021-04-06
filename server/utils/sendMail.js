import nodemailer from 'nodemailer';
import { google } from 'googleapis';
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
