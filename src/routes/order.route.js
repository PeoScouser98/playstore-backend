import express from "express";
import { placeOrder, getAll } from "../controllers/order.controller";

const router = express.Router();

router.get("/order", getAll);
router.post("/order/create", placeOrder);

export default router;
