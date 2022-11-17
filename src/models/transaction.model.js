import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
	apptransid: { type: String, require: true }, // mã giao dịch
	mac: { type: String, require: true }, // thông tin xác thực đơn hàng
	amount: { type: Number, require: true }, // tổng tiền thanh toán
	bankcode: { type: String }, // mã ngân hàng
	description: String, // thông tin mô tả đơn hàng
});

export default mongoose.model("Transactions", transactionSchema);
