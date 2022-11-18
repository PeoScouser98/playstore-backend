import createError from "http-errors";
import Product from "../models/product.model";
import Inventory from "../models/inventory.model";

export const list = async (req, res) => {
	try {
		const products = await Product.find().exec();
		if (!products || products.length === 0) throw createError.NotFound("Không tìm thấy sản phẩm nào!");
		if ((req.query._expand, req.query._expand == "category")) {
			const products = await Product.find().exec();
			if (!products) throw createError.NotFound("Không tìm thấy sản phẩm có danh mục tương ứng!");
			return res.status(200).json(products);
		}

		return res.status(200).json(products);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const read = async (req, res) => {
	try {
		const product = await Product.findOne({ _id: req.params.id }).exec();
		if ((req.query._expand, req.query._expand == "category")) {
			{
				const product = await Product.findOne({ _id: req.params.id }).populate({ path: "categoryId" }).exec();
				return res.status(200).json(product);
			}
		}
		return res.status(200).json(product);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const create = async (req, res) => {
	try {
		console.log(req.body);
		const newProduct = await new Product(req.body).save();
		return res.status(201).json(newProduct);
	} catch (error) {
		return res.json({
			status: error.status || 400,
			message: error.message,
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedProduct = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
		if (!updatedProduct) throw createError.NotFound("Không tìm thấy sản phẩm để cập nhật!");
		return res.status(201).json(updatedProduct);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};
export const remove = async (req, res) => {
	try {
		const removedProduct = await Product.findOneAndDelete({ _id: req.params.id });
		if (!removedProduct) throw createError.NotFound("Không tìm thấy sản phẩm để xóa!");
		const afterRemoved = await Product.find().exec();
		return res.status(201).json(afterRemoved);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};
