const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("./../../models/Users");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route POST api/users
// @desc Register User
// @access Public
router.post(
	"/",
	[
		check("name", "Please enter your name").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check(
			"password",
			"Please enter a password with 6 or more characters"
		).isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).jsonp({ errors: errors.array() });
		}
		try {
			const { name, email, password } = req.body;
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).jsonp({
					errors: [{ msg: "User already exists" }]
				});
			}
			const avatar = gravatar.url(email, {
				s: 200,
				r: "pg",
				d: "mm"
			});
			const salt = await bcrypt.genSalt(10);
			let pwd = await bcrypt.hash(password, salt);
			let newUser = await new User({
				name,
				email,
				password: pwd,
				gravatar: avatar
			}).save();
			const payload = {
				user: {
					id: newUser.id
				}
			};
			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{
					expiresIn: 360000
				},
				(err, token) => {
					if (err) throw err;
					res.jsonp({
						token
					});
				}
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
