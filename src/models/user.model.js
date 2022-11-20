import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
		minLength: 6,
	},
	username: {
		type: String,
		require: true,
		maxLength: 50,
	},
	address: {
		type: String,
	},
	phone: { type: String },
	role: { type: Number, enum: [0, 1, 2], default: 2 },
	refreshToken: {
		type: String,
	},
});
// * methods là 1 phương thức được định nghĩa cho 1 documents (1 bản ghi)
userSchema.methods = {
	async authenticate(password) {
		return bcrypt.compare(password, this.password);
	},
	async encryptPassword(password) {
		const salt = await bcrypt.genSalt(+process.env.SALT_LENGTH);
		return bcrypt.hash(password, salt);
	},
};

userSchema.pre("save", async function (next) {
	this.password = await this.encryptPassword(this.password);
	next();
});

export default mongoose.model("Users", userSchema);
