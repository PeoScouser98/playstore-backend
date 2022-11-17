import express from "express";
import * as _Account from "../controllers/auth.controller";
import * as _User from "../controllers/user.controller";

const router = express.Router();

router.post("/register", _Account.register);
router.post("/login", _Account.login);
router.get("/account/activate/:token", _Account.activateAccount);
router.get("/user", _User.get);
router.patch("/user", _User.update);

export default router;
