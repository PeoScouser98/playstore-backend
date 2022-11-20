import express from "express";
import { create, list } from "../controllers/order-status.controller";

const router = express.Router();

router.get("/order-status", list);
router.post("/order-status", create);

export default router;
