import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
	},
	{
		timestamp: true,
		strict: false,
	},
);

export default mongoose.model("Categories", categorySchema);
