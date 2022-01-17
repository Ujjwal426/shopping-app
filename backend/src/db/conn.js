import mongoose from "mongoose";
import "dotenv/config";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log(`Connected.....`.inverse))
  .catch((err) => console.log(`${err.message}`.red));
