import User from "../models/user.model";
import createError from "http-errors";

export const get = async (req, res) => {
	try {
		if (!req.auth) throw createError.Unauthorized("Bạn không đủ quyền truy cập vào thông tin người dùng!");
		const user = User.findOne({ _id: req.auth }).select("username email address phone");
		return res.status(200).json(user);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const update = async (req, res) => {
	try {
		if (!req.auth) throw createError.Unauthorized("Bạn không đủ quyền truy cập vào thông tin người dùng!");
		const updatedUserInfo = await User.findOneAndUpdate({ _id: req.auth }, req.body, { new: true, upsert: true });
		return res.status(201).json(updatedUserInfo);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};
