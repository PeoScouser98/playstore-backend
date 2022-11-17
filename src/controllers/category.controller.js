import createError from "http-errors";

import Category from "../models/category.model";
import Product from "../models/product.model";
export const list = async (req, res) => {
	try {
		const categories = await Category.find().exec();
		if (categories.length === 0) throw createError.NotFound("Không tìm thấy danh mục sản phẩm!");
		return res.status(200).json(categories);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const read = async (req, res) => {
	try {
		const category = await Category.findOne({ _id: req.params.id }).exec();
		if (!category || Object.keys(category).length === 0) throw createError.NotFound("Danh mục sản phẩm không tồn tại!");
		if (req.query._embed && req.query._embed == "products") {
			const products = await Product.find({ categoryId: category._id });
			if (!products) throw createError.NotFound("Không tìm thấy sản thuộc danh mục này!");
			return res.status(200).json({
				products: products,
				...category,
			});
		}
		return res.status(200).json(category);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const create = async (req, res) => {
	try {
		const newCategory = await new Category(req.body).save();
		if (!newCategory) throw createError.NotImplemented("Không thể thêm danh sản phẩm mục mới!");
		return res.status(201).json(newCategory);
	} catch (error) {
		return res.status(400).json({
			status: error.status,
			message: error.message,
		});
	}
};

export const update = async (req, res) => {
	try {
		const updatedCategory = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
		if (!updatedCategory) throw createError.NotFound("Không tìm thấy danh mục sản phẩm muốn update!");
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};

export const remove = async (req, res) => {
	try {
		const removedCategory = await Category.findOneAndDelete({ _id: req.params.id });
		if (!removedCategory) throw createError.NotFound("Không tìm thấy danh mục để xóa!");
		const afterRemoved = await Category.find().exec();
		return res.json(afterRemoved);
	} catch (error) {
		return res.json({
			status: error.status,
			message: error.message,
		});
	}
};
