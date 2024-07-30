import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import crypto from "crypto";
import cors from "cors";
app.use(cors());
// import fetch from "node-fetch";
// import sgMail from "@sendgrid/mail";
// import User from "./models/user.js";

// importing routes
import emailRouter from "./routes/auth/email.js";
import userRouter from  "./routes/getUserDetails.js";
import inputNameRouter from "./routes/auth/inputName.js";
dotenv.config();

// applying middel ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/auth/email', emailRouter);
app.use('/input-name',inputNameRouter)
app.use('/user',userRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));

// Define User schema

// // Temporary storage for OTPs and emails
// const otpStorage = {};
// let tempEmail = '';

// Set SendGrid API key
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// // Endpoint to send OTP
// app.post('/otp', async (req, res) => {
//   const { email, recaptchaResponse } = req.body;

//   // Verify reCAPTCHA
//   const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
//   const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaResponse}`;
//   const recaptchaResponseJson = await fetch(recaptchaVerifyUrl, { method: 'POST' }).then(res => res.json());

//   console.log('reCAPTCHA Verification Response:', recaptchaResponseJson); // Debugging log

//   if (!recaptchaResponseJson.success) {
//     return res.status(400).send({ message: 'reCAPTCHA verification failed' });
//   }

//   // Generate a 5-character OTP
//   const otp = crypto.randomBytes(3).toString('hex');

//   // Store the OTP temporarily
//   otpStorage[email] = otp;
//   tempEmail = email;

//   // Email content with OTP
//   const msg = {
//     to: email,
//     from: process.env.EMAIL_USER, // Use your verified sender email
//     subject: 'OTP Verification',
//     text: `Your OTP is ${otp}`
//   };

//   try {
//     await sgMail.send(msg);
//     res.send({ message: 'OTP sent!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Error sending OTP email' });
//   }
// });

// // Endpoint to verify OTP
// app.post('/verify-otp', async (req, res) => {
//   const { otp } = req.body;
//   const email = tempEmail;

//   // Validate the OTP
//   if (otpStorage[email] !== otp) {
//     return res.status(400).send({ message: 'Invalid OTP' });
//   }

//   // Check if the email already exists in the database
//   let user = await User.findOne({ email });

//   if (!user) {
//     // Create a new user document if it doesn't exist
//     user = new User({
//       email,
//       name: '', // Name will be added later
//       verified: true
//     });

//     await user.save();
//   }

//   // Remove the OTP from temporary storage
//   delete otpStorage[email];
//   tempEmail = '';

//   res.send({ message: 'Email Verified', isNewUser: !user.name });
// });

// Endpoint to get user details for the dashboard

// endpoint to show user info 
// app.get('/user/:email', async (req, res) => {
//   const { email } = req.params;
  
//   // Find the user in the database
//   const user = await User.findOne({ email });

//   if (user) {
//     res.send({ name: user.name });
//   } else {
//     res.status(404).send({ message: 'User not found' });
//   }
// });


// Endpoint to update user name
// app.post('/input-name', async (req, res) => {
//   const { email, name } = req.body;

//   // Update the user's name
//   const user = await User.findOneAndUpdate({ email }, { name }, { new: true });

//   if (user) {
//     res.send({ message: 'Name updated', name: user.name });
//   } else {
//     res.status(404).send({ message: 'User not found' });
//   }
// });

app.listen(4000, () => console.log('Server listening on port 4000'));
