const express = require("express");
const router = express.Router();
const User = require("./../../models/Users");
const Post = require("./../../models/Posts");
const auth = require("./../../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route POST api/posts
// @desc Create Post
// @access Private
router.post(
	"/",
	[auth, check("text", "Text is required").not().isEmpty()],
	async (req, res) => {
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).jsonp({ errors: errors.array() });
		}
		try {
			let user = await User.findById(req.user.id).select("-password");
			let newPost = {
				user: req.user.id,
				text: req.body.text,
				name: user.name,
				gravatar: user.gravatar
			};
			let post = await new Post(newPost).save();
			res.jsonp(post);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route GET api/posts/
// @desc Get all posts
// @access Private
router.get("/", auth, async (req, res) => {
	try {
		let posts = await Post.find().sort({ date: -1 });
		res.jsonp(posts);
	} catch (err) {
		console.log(err.message);
		res.status(500).send("Server Error");
	}
});

// @route GET api/posts/:post_id
// @desc Get posts by post id
// @access Private
router.get("/:post_id", auth, async (req, res) => {
	try {
		let post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(404).jsonp({
				msg: "Post not found"
			});
		}
		res.jsonp(post);
	} catch (err) {
		console.log(err.message);
		if (err.message.includes("Cast to ObjectId failed")) {
			return res.status(404).jsonp({
				msg: "Post not found"
			});
		}
		res.status(500).send("Server Error");
	}
});

// @route Delete api/posts/:post_id
// @desc Delete post by post id
// @access Private
router.delete("/:post_id", auth, async (req, res) => {
	try {
		let post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(404).jsonp({
				msg: "Post not found"
			});
		}
		if (req.user.id !== post.user.toString()) {
			return res.status(401).jsonp({
				msg: "you are unauthorized to delete the post"
			});
		}
		post.remove();
		res.jsonp({ msg: "Post deleted" });
	} catch (err) {
		console.log(err.message);
		if (err.message.includes("Cast to ObjectId failed")) {
			return res.status(404).jsonp({
				msg: "Post not found"
			});
		}
		res.status(500).send("Server Error");
	}
});

// @route PUT api/posts/like/:post_id
// @desc Insert user experience in profile
// @access Private
router.put("/like/:post_id", auth, async (req, res) => {
	try {
		let post = await Post.findById(req.params.post_id);
		if (
			post.likes.filter(like => like.user.toString() === req.user.id).length > 0
		) {
			return res.status(400).jsonp({
				msg: "You have already liked the post"
			});
		}
		post.likes.unshift({
			user: req.user.id
		});

		await post.save();
		res.jsonp(post.likes);
	} catch (err) {
		console.log(err.message);
		if (err.message.includes("Cast to ObjectId failed")) {
			return res.status(404).jsonp({
				msg: "Post not found"
			});
		}
		res.status(500).send("Server Error");
	}
});

// @route DELETE api/posts/like/:post_id
// @desc unlike post by post_id
// @access Private
router.put("/unlike/:post_id", auth, async (req, res) => {
	try {
		let post = await Post.findById(req.params.post_id);
		if (
			post.likes.filter(like => like.user.toString() === req.user.id).length ===
			0
		) {
			return res.status(400).jsonp({
				msg: "Post has not been liked yet"
			});
		}
		let removeIndex = post.likes
			.map(like => like.user._id.toString())
			.indexOf(req.user.id);
		post.likes.splice(removeIndex, 1);

		await post.save();
		res.jsonp(post.likes);
	} catch (err) {
		console.log(err.message);
		if (err.message.includes("Cast to ObjectId failed")) {
			return res.status(404).jsonp({
				msg: "Post not found"
			});
		}
		res.status(500).send("Server Error");
	}
});

// @route POST api/posts/comment/:post_id
// @desc Create comment
// @access Private
router.put(
	"/comment/:post_id",
	[auth, check("text", "Text is required").not().isEmpty()],
	async (req, res) => {
		let errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).jsonp({ errors: errors.array() });
		}
		try {
			let user = await User.findById(req.user.id).select("-password");
			let post = await Post.findById(req.params.post_id);
			if (!post) {
				return res.status(404).jsonp({
					msg: "Post not found"
				});
			}
			let newComment = {
				user: req.user.id,
				text: req.body.text,
				name: user.name,
				gravatar: user.gravatar
			};
			console.log(post);
			post.comments.unshift(newComment);
			post.save();
			res.jsonp(post.comments);
		} catch (err) {
			console.error(err.message);
			if (err.message.includes("Cast to ObjectId failed")) {
				return res.status(404).jsonp({
					msg: "Post not found"
				});
			}
			res.status(500).send("Server Error");
		}
	}
);

// @route POST api/posts/comment/:post_id/:comment_id
// @desc Delete comment by commentid
// @access Private
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).jsonp({ errors: errors.array() });
	}
	try {
		let post = await Post.findById(req.params.post_id);
		if (!post) {
			return res.status(404).jsonp({
				msg: "Post not found"
			});
		}

		let comment = post.comments.find(
			comment => comment.id.toString() === req.params.comment_id
		);
		if (!comment) {
			return res.status(404).jsonp({
				msg: "Comment not found"
			});
		}
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).jsonp({
				msg: "You are not authorizd to delete the comment"
			});
		}
		let removeIndex = post.comments
			.map(comment => comment.id.toString())
			.indexOf(req.params.comment_id);
		post.comments.splice(removeIndex, 1);
		post.save();
		res.jsonp(post.comments);
	} catch (err) {
		console.error(err.message);
		if (err.message.includes("Cast to ObjectId failed")) {
			return res.status(404).jsonp({
				msg: "Post not found"
			});
		}
		res.status(500).send("Server Error");
	}
});

module.exports = router;
