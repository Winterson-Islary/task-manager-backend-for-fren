const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
	creatorId: {
		type: mongoose.ObjectId,
		ref: "User",
	},
	title: {
		type: String,
		require: true,
	},
	priority: {
		type: String,
		require: true,
	},
	deadline: {
		type: Date,
	},
	tasklist: {
		type: [String],
		require: true,
	},
	status: {
		type: String,
		require: true,
	},
});

module.exports = mongoose.model("Task", taskSchema);
