const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
	try {
		mongoose.set("strictQuery", false); // Suppress Mongoose deprecation warning

		await mongoose.connect(process.env.DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log("Connected to database successfully");
	} catch (error) {
		console.error("Database connection error:", error);
		process.exit(1); // Exit process with failure
	}
};

module.exports = connectDB;