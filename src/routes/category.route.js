import express from "express";
import * as Category from "../controllers/category.controller";
import { checkAdmin, checkAuth } from "../middlewares/authorization.middleware";
const router = express.Router();

router.get("/categories", Category.list);
router.get("/categories/:id", Category.list);
router.post("/categories/create", checkAuth, checkAdmin, Category.create);
router.patch("/categories/:id/update", checkAuth, checkAdmin, Category.update);
router.delete("/categories/:id/remove", checkAuth, checkAdmin, Category.remove);
export default router;
