import OrderStatus from "../models/order-status.model";
import createError from "http-errors";

export const list = async (req, res) => {
	try {
		const orderStatus = await OrderStatus.find().exec();
		if (!orderStatus) throw createError.NotFound("Không tồn tại trạng thái đơn hàng!");
		return res.status(200).json(orderStatus);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const create = async (req, res) => {
	try {
		const orderStatus = await new OrderStatus(req.body).save();
		if (!orderStatus) throw createError.BadRequest("Lỗi tạo trạng thái đơn hàng");
		return res.status(201).json(orderStatus);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};
