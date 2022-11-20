import createError from "http-errors";

import Inventory from "../models/inventory.model";
import Order from "../models/order.model";

export const getAll = async (req, res) => {
	try {
		const orders = await Order.find().populate({ path: "product" }).select("-id").exec();
		if (!orders) throw createError.NotFound("Không tìm thấy đơn hàng nào!");
		return res.status(200).json(orders);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const getByCustomer = async (req, res) => {
	try {
		const ordersByCustomer = await Order.find({ customerId: req.params.customerId });
		if (!ordersByCustomer)
			throw createError.NotFound("Không có đơn hàng nào của người dùng / thông tin người dùng không hợp lệ");
		return res.status(200).json(ordersByCustomer);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const placeOrder = async (req, res) => {
	try {
		const order = new Order(req.body).save();
		for (const item of order.purchasedItems) {
			const modifiedInventoryItem = await Inventory.findOneAndUpdate(
				{ product: item.product, stock: { $gt: item.quantity } }, // tìm ra sản phẩm đặt mua trong kho có số lượng tồn kho > số lượng đặt mua
				{ $inc: { stock: -item.quantity } }, // trừ đi số lượng sản phẩm người dùng đã đặt mua
				{ new: true },
			);
			console.log(modifiedInventoryItem);
			if (!modifiedInventoryItem) {
				throw createError.BadRequest("Số lượng sản phẩm trong kho không đủ hoặc đã ngừng bán!");
			}
		}
		return res.status(201).json(order);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const cancelOrder = async (req, res) => {
	try {
		const cancelledOrder = await Order.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { orderStatus: req.body.orderStatusId } },
			{ new: true },
		);
		if (!cancelledOrder) throw createError.BadRequest("Lỗi hủy đơn hàng!");
		for (const item of cancelledOrder.purchasedItems) {
			await Inventory.findOneAndUpdate(
				{ product: item.product }, // tìm ra sản phẩm đặt mua trong kho có số lượng tồn kho > số lượng đặt mua
				{ $inc: { stock: item.quantity } }, // trừ đi số lượng sản phẩm người dùng đã đặt mua
				{ new: true },
			);
		}
		return res.status(201).json(cancelledOrder);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};
