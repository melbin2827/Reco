import express from 'express';
const router = express.Router();
import mongoose from "mongoose";
import User from '../../models/user.js';
import crypto from "crypto";
import fetch from "node-fetch";
import sgMail from "@sendgrid/mail";



// Temporary storage for OTPs and emails
const otpStorage = {};
let tempEmail = '';

// Endpoint to send OTP
router.post('/otp', async (req, res) => {
  const { email, recaptchaResponse } = req.body;

  // Verify reCAPTCHA
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaResponse}`;
  const recaptchaResponseJson = await fetch(recaptchaVerifyUrl, { method: 'POST' }).then(res => res.json());

  console.log('reCAPTCHA Verification Response:', recaptchaResponseJson); // Debugging log

  if (!recaptchaResponseJson.success) {
    return res.status(400).send({ message: 'reCAPTCHA verification failed' });
  }

  // Generate a 5-character OTP
  const otp = crypto.randomBytes(3).toString('hex');

  // Store the OTP temporarily
  otpStorage[email] = otp;
  tempEmail = email;
  
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // Email content with OTP
  const msg = {
    to: email,
    from: process.env.EMAIL_USER, // Use your verified sender email
    subject: 'OTP Verification',
    text: `Your OTP is ${otp}`
  };

  try {
    await sgMail.send(msg);
    res.send({ message: 'OTP sent!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error sending OTP email' });
  }
});

// Endpoint to verify OTP
router.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;
  const email = tempEmail;

  // Validate the OTP
  if (otpStorage[email] !== otp) {
    return res.status(400).send({ message: 'Invalid OTP' });
  }

  // Check if the email already exists in the database
  let user = await User.findOne({ email });

  if (!user) {
    // Create a new user document if it doesn't exist
    user = new User({
      email,
      name: '', // Name will be added later
      verified: true
    });

    await user.save();
  }

  // Remove the OTP from temporary storage
  delete otpStorage[email];
  tempEmail = '';

  res.send({ message: 'Email Verified', isNewUser: !user.name });
});

export default router;