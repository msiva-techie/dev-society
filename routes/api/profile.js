const express = require("express");
const router = express.Router();
const User = require("./../../models/Users");
const Profile = require("./../../models/Profile");
const Posts = require("./../../models/Posts");
const auth = require("./../../middleware/auth");
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

// @route GET api/profile/me
// @desc Get current users' profile
// @access Private
router.get("/me", auth, async (req, res) => {
	try {
		let profile = await Profile.findOne({
			user: req.user.id
		}).populate("user", ["name", "gravatar"]);

		if (!profile) {
			return res.status(400).jsonp({
				msg: "There is no profile for this user"
			});
		}

		res.jsonp(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

// @route GET api/profile/me
// @desc Insert/Update current users' profile
// @access Private
router.post(
	"/me",
	[
		auth,
		check("status", "Status not found").not().isEmpty(),
		check("skills", "Skills not found").not().isEmpty()
	],
	async (req, res) => {
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).jsonp({ errors: errors.array() });
		}
		let {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin
		} = req.body;
		// Build profile fields
		let profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = Array.isArray(skills)
				? skills
				: skills.split(",").map(value => value.trim());
		}

		// Build social field
		profileFields.social = {};

		if (youtube) profileFields.social.youtube = youtube;
		if (facebook) profileFields.social.facebook = facebook;
		if (twitter) profileFields.social.twitter = twitter;
		if (instagram) profileFields.social.instagram = instagram;
		if (linkedin) profileFields.social.linkedin = linkedin;

		try {
			let profile = await Profile.findOne({
				user: req.user.id
			});
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{
						user: req.user.id
					},
					{
						$set: profileFields
					},
					{ new: true }
				);
				return res.jsonp(profile);
			}

			profile = new Profile(profileFields);
			await profile.save();
			res.jsonp(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route GET api/profile/
// @desc Get all profiles
// @access Public
router.get("/", async (req, res) => {
	try {
		let profile = await Profile.find().populate("user", ["name", "gravatar"]);
		res.jsonp(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

// @route GET api/profile/
// @desc Get profile of a user ID
// @access Public
router.get("/user/:user_id", async (req, res) => {
	try {
		let profile = await Profile.findOne({
			user: req.params.user_id
		}).populate("user", ["name", "gravatar"]);
		if (!profile) {
			return res.status(404).jsonp({
				msg: "Profile not found"
			});
		}
		res.jsonp(profile);
	} catch (err) {
		console.log(err.message);
		if (err.message.includes("Cast to ObjectId failed")) {
			return res.status(404).jsonp({
				msg: "Profile not found"
			});
		}
		res.status(500).send("Server Error");
	}
});

// @route Delete api/profile/
// @desc Delete user, profile and posts
// @access Private
router.delete("/", auth, async (req, res) => {
	try {
		await Posts.deleteMany({ user: req.user.id });
		await Profile.findOneAndRemove({ user: req.user.id });
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: "User deleted" });
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

// @route PUT api/profile/experience
// @desc Insert user experience in profile
// @access Private
router.put(
	"/experience",
	[
		auth,
		[
			check("title", "Title not found").not().isEmpty(),
			check("company", "Company not found").not().isEmpty(),
			check("from", "From date not found").not().isEmpty()
		]
	],
	async (req, res) => {
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).jsonp({ errors: errors.array() });
		}
		let { title, company, location, from, to, current, description } = req.body;
		try {
			let profile = await Profile.findOne({
				user: req.user.id
			});
			let newExp = { title, company, location, from, to, current, description };
			profile.experience.unshift(newExp);

			await profile.save();
			res.jsonp(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route DELETE api/profile/experience/:exp_id
// @desc Delete user experience in profile
// @access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
	try {
		let profile = await Profile.findOneAndUpdate(
			{
				user: req.user.id
			},
			{
				$pull: {
					experience: {
						_id: req.params.exp_id
					}
				}
			},
			{ new: true }
		);
		// await profile.save();
		res.jsonp(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

// @route PUT api/profile/education
// @desc Insert user education in profile
// @access Private
router.put(
	"/education",
	[
		auth,
		[
			check("school", "school not found").not().isEmpty(),
			check("degree", "Company not found").not().isEmpty(),
			check("fieldofstudy", "fieldofstudy not found").not().isEmpty(),
			check("from", "From date not found").not().isEmpty()
		]
	],
	async (req, res) => {
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).jsonp({ errors: errors.array() });
		}
		let {
			school,
			degree,
			fieldofstudy,
			from,
			to,
			current,
			description
		} = req.body;
		try {
			let profile = await Profile.findOne({
				user: req.user.id
			});
			let newEdu = {
				school,
				degree,
				fieldofstudy,
				from,
				to,
				current,
				description
			};
			profile.education.unshift(newEdu);

			await profile.save();
			res.jsonp(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route DELETE api/profile/education/:exp_id
// @desc Delete user education in profile
// @access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
	try {
		let profile = await Profile.findOneAndUpdate(
			{
				user: req.user.id
			},
			{
				$pull: {
					education: {
						_id: req.params.edu_id
					}
				}
			},
			{ new: true }
		);
		// await profile.save();
		res.jsonp(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

// @route GET api/profile/github/:github_username
// @desc Get github repos using github username
// @access Public
router.get("/github/:github_username", async (req, res) => {
	try {
		let options = {
			uri: `https://api.github.com/users/${
				req.params.github_username
			}/repos?per_page=5&sort=created:dsc&client_id=${config.get(
				"github.clientId"
			)}&client_secret=${config.get("github.clientSecret")}`,
			method: "GET",
			headers: {
				"user-agent": "node.js"
			}
		};
		request(options, (error, response, body) => {
			if (error) {
				console.error(error);
				return res.jsonp({ errors: [error] });
			}
			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: "No Github profile found" });
			}
			res.jsonp(JSON.parse(body));
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
