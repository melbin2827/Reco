import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
app.use(cors());

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


app.listen(4000, () => console.log('Server listening on port 4000'));
