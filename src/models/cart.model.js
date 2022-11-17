import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
	{
		customerId: {
			type: String,
			require: true,
		},

		purchasedItems: {
			type: Array,
			require: true,
			default: [],
		},
	},
	{
		timestamp: true,
		strictPopulate: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

cartSchema.virtual("isActive").get(function () {
	return Date.now() - this.createdAt > 0;
});

export default mongoose.model("Carts", cartSchema);
