import jwt from "jsonwebtoken";
import "dotenv/config";
import createError from "http-errors";
// * Using models & services
import User from "../models/user.model";
import transporter from "../services/mailer.service";

export const register = async (req, res) => {
	try {
		const existedUser = await User.findOne({ email: req.body.email }).exec();
		console.log(existedUser);
		if (existedUser) throw createError.BadRequest("Tài khoản đã tồn tại!");

		const token = jwt.sign(req.body, process.env.TOKEN_SECRET, { expiresIn: "5m" });
		const info = await transporter.sendMail({
			from: process.env.AUTH_EMAIL,
			to: req.body.email,
			subject: "Cảm ơn bạn đã đăng ký tài khoản ...",
			html: `<p>Click vào đường <a href='${process.env.ACTIVATE_ACCOUNT_LINK}/${token}'>link</a> này để kích hoạt khoản </p>`,
		});
		return res.status(200).json(info);
	} catch (error) {
		return res.status(400).json({
			status: error.status,
			message: error.message,
		});
	}
};

export const activateAccount = async (req, res, next) => {
	try {
		const token = req.params.token;
		console.log("token:>>>", token);
		if (!token) throw createError.NotFound("Token không tồn tại !");

		const registedUser = jwt.verify(token, process.env.TOKEN_SECRET);
		if (!registedUser) throw createError.Unauthorized("Access token không hợp lệ!");
		await new User(registedUser).save();
		next();
	} catch (error) {
		return res.status(401).json({
			message: "Không thể xác minh tài khoản!",
			error: error,
		});
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email }).exec();
		if (!user) {
			const error = createError.NotFound("Tài khoản không tồn tại");
			console.log("status:>>", error.status);
			throw error;
		}

		let isValidPassword = user.authenticate(req.body.password, user.password);
		if (!isValidPassword) throw createError.NotFound("Mật khẩu không chính xác");

		// * tạo access token
		const accessToken = jwt.sign({ auth: user._id }, process.env.TOKEN_SECRET, { expiresIn: "1h" });

		return res.status(200).json({
			auth: user._id,
			accessToken: accessToken,
		});
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const refreshToken = async (req, res) => {
	try {
		const refreshToken = jwt.sign({ auth: req.body.auth }, process.env.TOKEN_SECRET);
		if (!refreshToken) throw createError.NotImplemented("Lỗi tạo refresh token");
		return refreshToken;
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};
