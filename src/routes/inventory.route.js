import express from "express";
import * as _Inventory from "../controllers/inventory.controller";
import { checkAdmin, checkAuth } from "../middlewares/authorization.middleware";

const router = express.Router();
router.get("/inventory", _Inventory.list);
router.get("/inventory/:id", _Inventory.read);
router.post("/inventory", checkAuth, checkAdmin, _Inventory.create);
router.patch("/inventory/:id/add-on-stock", checkAuth, checkAdmin, _Inventory.addOnStock);
router.delete("/inventory/:id", checkAuth, checkAdmin, _Inventory.remove);

export default router;
