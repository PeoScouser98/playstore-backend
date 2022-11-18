import mongoose from "mongoose";
import autoPopulate from "mongoose-autopopulate";
const inventorySchema = mongoose.Schema(
	{
		product: { type: mongoose.Types.ObjectId, require: true },
		stock: {
			type: Number,
			require: true,
			min: 0,
		}, // số lượng sản phẩm hiện còn trong kho
		reservations: {
			type: Array, // customerName:String - quantity:Number
			default: [],
		},
		autopopulate: true,
	},
	{
		timestamp: true,
		strictPopulate: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

inventorySchema.plugin(autoPopulate);
export default mongoose.model("Inventory", inventorySchema);
