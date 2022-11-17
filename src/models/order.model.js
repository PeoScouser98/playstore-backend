import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
	{
		customerId: {
			type: mongoose.Types.ObjectId,
			ref: "Users",
		},
		phone: {
			type: String,
			require: true,
		},
		shipping: {
			customerName: String, // tên người nhận hàng/khách hàng
			address: String, // địa chỉ giao hàng
			deliveryNotes: String, // ghi chú giao hàng
			shippingCost: Number, // phí vận chuyển
			status: {
				type: Number,
				enum: [0, 1, 2, 3, 4],
				default: 0,
			},
		},

		transaction: {
			type: mongoose.Types.ObjectId,
		},
		purchased: {
			type: mongoose.Types.ObjectId,
			ref: "Carts",
		},
		amount: { type: Number, require: true },
		totalAmount: { type: Number, require: true },
	},
	{
		timestamp: true,
		strictPopulate: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

orderSchema.virtual("totalAmount").get(function () {
	return this.amount + this.shipping.shippingCost;
});
orderSchema.virtual("isRegisteredUser").get(function () {
	return this.customerId !== undefined;
});

export default mongoose.model("Orders", orderSchema);
