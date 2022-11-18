import mongoose from "mongoose";
import autoPopulate from "mongoose-autopopulate";

const productSchema = mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
		price: {
			type: Number,
			require: true,
		},
		discount: {
			type: Number,
			default: 0,
		},
		category: {
			type: mongoose.Types.ObjectId,
			require: true,
			ref: "Categories",
			autopopulate: true,
		},
		description: {
			type: String,
			require: true,
			default: "Chưa có mô tả",
		},
		image: {
			type: String,
			require: true,
		},
		stock: {
			type: Number,
			require: true,
		},
		alternateImages: [String],
		specs: {
			type: [{ k: String, v: String | Number }],
			index: true,
		},
		variants: {
			type: [{ type: mongoose.Schema.ObjectId, ref: "Products" }],
			default: [],
		},
	},
	{
		timestamp: true,
		strictPopulate: false,
		// toJSON: { virtuals: true },
		// toObject: { virtuals: true },
	},
);
productSchema.plugin(autoPopulate);

// productSchema.virtual("category", {
// 	ref: "Categories", // bảng muốn tham chiếu đến
// 	localField: "categoryId", // tên trường categoryId trong bảng product
// 	foreignField: "_id", // _id trong bảng categories
// 	justOne: true,
// });

export default mongoose.model("Products", productSchema);
