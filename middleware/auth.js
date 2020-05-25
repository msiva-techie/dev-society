const jwt = require("jsonwebtoken");
// const User = require("./../models/Users");
const config = require("config");

module.exports = async (req, res, next) => {
	let token = req.header("x-auth-token");
	if (!token) {
		return res
			.status(401)
			.jsonp({ msg: "No token found. authorization denied" });
	}
	try {
		let decoded = await jwt.verify(
			req.header("x-auth-token"),
			config.get("jwtSecret")
		);
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).jsonp({ msg: "Invalid Token" });
	}
};
