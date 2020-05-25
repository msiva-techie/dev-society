const express = require("express");
const app = express();
const connectDB = require("./db").connectDB;
const path = require("path");

const PORT = process.env.port || 7000;

connectDB();

// Init middlewares

app.use(express.json({ extended: false }));

// Define Routes

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

// Serve static assets in production
console.log("config...", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log("Server started at port ", PORT);
});
