import Inventory from "../models/inventory.model";
import createError from "http-errors";
// TODO:  LIST INVENTORY
export const list = async (req, res) => {
	try {
		const inventoryItems = await Inventory.find().exec();
		if (!inventoryItems) createError.NotFound("Kho hàng không tồn tại!");
		// handle logic ...
		return res.status(200).json(inventoryItems);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
		// handle errors
	}
};
// TODO: READ SINGLE INVENTORY
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
// TODO: CREATE A NEW INVENTORY
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

// TODO: UPDATE AN ITEM IN INVENTORY
export const update = async (req, res) => {
	try {
		const action = req.query.action;
		switch (action) {
			case "checkout":
				const updatedInventoryReservations = await Inventory.findOneAndUpdate(
					{ _id: req.params.id },
					{ $push: { reservations: req.body }, $set: { stock: stock - req.body.quantity } },
					{ new: true, upsert: true },
				);
				if (updatedInventoryReservations) createError.NotFound("Không tìm thấy sản phẩm trong kho hàng");

				return res.status(201).json(updatedInventoryReservations);
			case "import":
				const updatedInventoryStock = await Inventory.findOneAndUpdate(
					{ _id: req.params.id },
					{ $set: { stock: req.body.stock } },
					{ new: true, upsert: true },
				);
				if (!updatedInventoryStock) createError.NotFound("Không tìm thấy sản phẩm trong kho hàng");
				return res.status(201).json(updatedInventoryStock);
			default:
				break;
		}
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};
