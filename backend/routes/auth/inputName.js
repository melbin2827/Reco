import express from 'express';
const router = express.Router();
// import mongoose from "mongoose";
import User from "../../models/user.js";

router.post('/', async (req, res) => {
  const { email, name } = req.body;

  // Update the user's name
  const user = await User.findOneAndUpdate({ email }, { name }, { new: true });

  if (user) {
    res.send({ message: 'Name updated', name: user.name });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

export default router;