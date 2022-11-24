import express from "express";
import * as _Auth from "../controllers/auth.controller";
import * as _User from "../controllers/user.controller";
import { checkAuth } from "../middlewares/authorization.middleware";
const router = express.Router();

router.post("/register", _Auth.register);
router.post("/login", _Auth.login);
router.get("/account/activate/:token", _Auth.activateAccount);
router.get("/user", checkAuth, _User.get);
router.patch("/user", checkAuth, _User.update);
router.post("/refresh-token", _Auth.refreshToken);
export default router;
