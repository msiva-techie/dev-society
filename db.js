const mongoose = require("mongoose");
const config = require("config");

const connectDB = async () => {
	try {
		await mongoose.connect(config.get("db.url"), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		});
		console.log("Connected to MongoDB.......");
	} catch (err) {
		console.log(err.message);
		process.exit(1);
	}
};

module.exports.connectDB = connectDB;
