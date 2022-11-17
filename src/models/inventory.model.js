import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
	{
		product: { type: mongoose.Types.ObjectId, require: true },
		inStock: Number, // số lượng sản phẩm hiện còn trong kho
		reservationQty: Number, // số lượng sản phẩm đã có người đặt
		status: {
			type: String,
			enum: ["còn hàng", "hết hàng", "ngừng kinh doanh"],
			default: "còn hàng",
		},
	},
	{
		timestamp: true,
		strictPopulate: false,
	},
);

export default mongoose.model("Inventory", inventorySchema);
