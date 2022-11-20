import mongoose from "mongoose";
import autoPopulatePlugin from "mongoose-autopopulate";

const inventorySchema = mongoose.Schema(
	{
		product: {
			type: mongoose.Types.ObjectId,
			require: true,
			autopopulate: true,
			ref: "Products",
		},
		stock: {
			type: Number,
			require: true,
			min: 0,
		}, // số lượng sản phẩm hiện còn trong kho
		imports: [
			{
				supplier: {
					name: String,
					phone: String,
					email: String,
					address: String,
				},
				unitPrice: Number,
				quantity: Number,
			},
		],
	},
	{
		timestamp: true,
		strictPopulate: false,
	},
);
inventorySchema.methods.checkPosibleQty = function (quantity) {
	return this.stock > quantity;
};

inventorySchema.plugin(autoPopulatePlugin);
export default mongoose.model("Inventory", inventorySchema);
