import express from "express";
import { addOrderItem } from "../Controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addOrderItem);

export default router;
