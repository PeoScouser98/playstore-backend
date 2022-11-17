import express from "express";
import * as Product from "../controllers/product.controller";
import { checkAdmin, checkAuth } from "../middlewares/authorization.middleware";

const router = express.Router();

// TODO: CREATE PRODUCT ROUTER
router.get("/products", Product.list);
router.get("/products/:id", Product.read);
router.post("/products/create", checkAuth, checkAdmin, Product.create);
router.patch("/products/:id/update", checkAuth, checkAdmin, Product.update);
router.delete("/products/:id/remove", checkAuth, checkAdmin, Product.remove);

export default router;
