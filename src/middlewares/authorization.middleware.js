import jwt from "jsonwebtoken";
import "dotenv/config";
import createError from "http-errors";
import standardizeString from "../helpers/standardizeString";

import User from "../models/user.model";
export const checkAuth = async (req, res, next) => {
	try {
		let token = req.headers.authorization;
		if (!token) throw createError.Unauthorized("Access token không hợp lệ!");
		token = standardizeString(token).split(" ")[1];

		const payload = jwt.verify(token, process.env.TOKEN_SECRET);
		if (!payload) throw createError.Unauthorized("Không phải người dùng của hệ thống, trym cút!");

		const user = await User.findOne({ _id: payload.auth }).select("_id role");
		if (!user) throw createError.NotFound("Người dùng không tồn tại trong hệ thống!");

		console.log(user);
		req.auth = user._id;
		req.role = user.role;
		next();
	} catch (error) {
		return res.json({
			status: 401,
			message: error.message,
		});
	}
};

export const checkAdmin = async (req, res, next) => {
	try {
		if (req.role !== 1) return res.status(401).json("Không phải admin, trym cút!");
		next();
	} catch (error) {
		return next(error);
	}
};
