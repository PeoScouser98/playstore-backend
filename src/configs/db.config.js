import mongoose from "mongoose";
import "dotenv/config";

const connectMongoDB = () =>
	mongoose
		.connect(process.env.DATABASE_URI, {
			serverSelectionTimeoutMS: 5000,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((data) => {
			console.log("Connected to database!");
		})
		.catch((error) => console.log(error.message));

export default connectMongoDB;
