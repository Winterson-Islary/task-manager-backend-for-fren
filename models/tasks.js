const mongoose = require("mongoose");
const taskListSchema = new mongoose.Schema({
	isChecked: {
		type: Boolean,
		require: true,
	},
	title: {
		type: String,
		require: true,
	},
});
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
		type: [taskListSchema],
		require: true,
	},
	status: {
		type: String,
		default: "todo",
	},
});

module.exports = mongoose.model("Task", taskSchema);
