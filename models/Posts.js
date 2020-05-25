const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users"
	},
	text: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	gravatar: {
		type: String
	},
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "users"
			}
		}
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "users"
			},
			text: {
				type: String
			},
			name: {
				type: String
			},
			gravatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("post", PostSchema);
