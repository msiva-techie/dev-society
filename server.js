const express = require("express");
const app = express();
const connectDB = require("./db").connectDB;

const PORT = process.env.port || 6000;

connectDB();

// Init middlewares

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
	res.send("App is running......");
});

// Define Routes

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(PORT, () => {
	console.log("Server started at port ", PORT);
});
