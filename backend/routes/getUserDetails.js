import express from 'express';
const router = express.Router();
// import mongoose from "mongoose";
import User from "../models/user.js";


// endpoint to show user info 
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  
  // Find the user in the database
  const user = await User.findOne({ email });

  if (user) {
    res.send({ name: user.name });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

export default router;