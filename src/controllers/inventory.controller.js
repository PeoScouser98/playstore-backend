import Inventory from "../models/inventory.model";
import createError from "http-errors";

export const list = async (req, res) => {
	try {
		const inventoryItems = await Inventory.find().populate("orders").exec();
		if (!inventoryItems) createError.NotFound("Kho hàng không tồn tại!");
		// inventoryItems.forEach((item) => console.log(item));
		return res.status(200).json(inventoryItems);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
		// handle errors
	}
};

export const read = async (req, res) => {
	try {
		const inventoryItem = await Inventory.findOne({ _id: req.params.id }).exec();
		if (!inventoryItem) createError.NotFound("Không tìm thấy sản phẩm trong kho hàng!");
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
		// handle errors
	}
};

export const create = async (req, res) => {
	try {
		if (!req.body) throw createError.BadRequest("Thông tin sản phẩm trong kho không hợp lệ");
		const newInventoryItem = await new Inventory(req.body).save();
		return res.status(201).json(newInventoryItem);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const addOnStock = async (req, res) => {
	try {
		const updatedInventoryStock = await Inventory.findOneAndUpdate({ _id: req.params.id }, { $inc: { stock: req.body.stock } }, { new: true, upsert: true });
		return res.status(201).json(updatedInventoryStock);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const remove = async (req, res) => {
	try {
		const removedItem = await Inventory.findOneAndDelete({ _id: req.params.id }).exec();
		if (!removedItem) throw createError.NotFound("Không tìm được sản phẩm để xóa!");
		const afterRemove = await Inventory.find().exec();
		return res.status(201).json(afterRemove);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};
