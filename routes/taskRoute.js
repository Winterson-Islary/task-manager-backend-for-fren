const express = require("express");
const router = express.Router();
const taskController = require("../controller/tasksController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get", authMiddleware, taskController.getTasks);
router.post("/create", authMiddleware, taskController.createTask);
router.put("/update", authMiddleware, taskController.updateTask);
router.delete("/delete", authMiddleware, taskController.deleteTask);

module.exports = router;
