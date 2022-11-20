import mongoose from "mongoose";

const orderStatusSchema = mongoose.Schema({
	statusName: {
		type: String,
		require: true,
	},
});

export default mongoose.model("OrderStatus", orderStatusSchema);
