const Task = require("../models/tasks");

const getTasks = async (req, res) => {
	try {
		const user_id = req.userId;
		const user_tasks = await Task.find().where("creatorId").equals(user_id);
		return res.status(201).json({
			message: "query executed successfully",
			tasks: user_tasks,
		});
	} catch (error) {
		return res.status(500).json({
			message: "internal server error: failed to get tasks",
		});
	}
};
const createTask = async (req, res) => {
	try {
		const user_id = req.userId;
		const { title, priority, deadline, tasklist } = req.body;
		if (!title || !priority || !tasklist) {
			return res.status(400).json({
				message: "missing values",
			});
		}

		const taskFinal = new Task({
			creatorId: user_id,
			title: title,
			deadline: deadline || null,
			priority: priority,
			tasklist: tasklist,
		});
		await taskFinal.save();
		return res.json({ message: "task created successfully" });
	} catch (error) {
		return res.status(500).json({
			message: "internal server error: failed to create task",
		});
	}
};

// structure of  task_body = {
// 	id, title, deadline, tasklist, status
// }
const updateTask = async (req, res) => {
	try {
		const { task_body } = req.body; //! Reminder: pass task_body (task to be updated) as an object.
		const { id, title, deadline, tasklist, status } = task_body;
		const result = await Task.findByIdAndUpdate(id, {
			title: title,
			deadline: deadline,
			tasklist: tasklist,
			status: status,
		});
		if (!result) {
			return res.status(404).json({
				message: "no task with given id",
			});
		}
		return res.status(201).json({
			message: "task updated successfully",
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "internal server error: failed to update task" });
	}
};
const deleteTask = async (req, res) => {
	try {
		const { task_id } = req.body;
		if (!task_id) {
			return res.status(400).json({
				message: "bad request",
			});
		}
		const task = await Task.findByIdAndDelete(task_id);
		if (!task) {
			return res.status(404).json({
				message: "no task with given id",
			});
		}
		return res.status(201).json({
			message: "task deleted successfully",
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: "internal server error: failed to delete task" });
	}
};

module.exports = { createTask, updateTask, deleteTask, getTasks };
