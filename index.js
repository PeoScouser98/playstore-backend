import app from "./src/app";
import dbConnection from "./src/configs/db.config";
import "dotenv/config";

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is listening on: http://localhost:${PORT}`);
});

dbConnection();
