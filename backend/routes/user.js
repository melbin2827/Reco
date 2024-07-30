import express from "express";
import User from "../models/user.js";

const router = express.Router();

// Endpoint to get user details for the dashboard
router.get('/user/:email', async (req, res) => {
  const { email } = req.params;

  // Find the user in the database
  const user = await User.findOne({ email });

  if (user) {
    res.send({ name: user.name });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

// Endpoint to update user name
router.post('/update-name', async (req, res) => {
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
