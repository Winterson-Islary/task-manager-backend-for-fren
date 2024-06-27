const express = require("express");
const router = express.Router();
const taskController = require("../controller/tasksController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/getTask", authMiddleware, taskController.getTasks);
router.post("/createTask", authMiddleware, taskController.createTask);
router.put("/updateTask", authMiddleware, taskController.updateTask);
router.delete("/deleteTask", authMiddleware, taskController.deleteTask);

module.exports = router;
