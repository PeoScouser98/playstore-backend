import mongoose from "mongoose";
import autoPopulatePlugin from "mongoose-autopopulate";

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
		},
		transaction: {
			type: mongoose.Types.ObjectId,
		},
		purchasedItems: [
			{
				product: {
					type: mongoose.Types.ObjectId,
					ref: "Products",
					autopopulate: { select: "title -category" },
				},
				unitPrice: {
					type: Number,
					min: 10000,
				},
				quantity: {
					type: Number,
					min: 1,
				},
			},
		],
		totalAmount: { type: Number, require: true },
		orderStatus: {
			type: mongoose.Types.ObjectId,
			ref: "OrderStatus",
			autopopulate: true,
		},
	},

	{
		timestamp: true,
		strictPopulate: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

// * check có phải khách hàng của hệ thống hay khách vãng lai
orderSchema.virtual("isRegisteredCustomer").get(function () {
	return this.customerId !== undefined;
});

orderSchema.pre("save", function (next) {
	const tempAmount = this.purchasedItems.reduce((prev, curr) => {
		return prev + curr.unitPrice * curr.quantity;
	}, 0);
	this.totalAmount = tempAmount + this.shipping.shippingCost;
	next();
});

orderSchema.plugin(autoPopulatePlugin);

export default mongoose.model("Orders", orderSchema);
