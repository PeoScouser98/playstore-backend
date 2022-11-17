import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
// * import router
import categoryRouter from "./routes/category.route";
import authRouter from "./routes/auth.route";
import productRouter from "./routes/product.route";

import { activateAccount } from "./controllers/auth.controller";
const app = express();

// * apply middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// * using router
app.use("/api", categoryRouter);
app.use("/api", authRouter);
app.use("/api", productRouter);

app.get("/", (req, res) => {
	res.send("Server now is running!");
});
app.get("/account/activate/:token", activateAccount, (req, res) => {
	res.sendFile(path.resolve(__dirname, "activate.html"));
});
// * export
export default app;
