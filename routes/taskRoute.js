const express = require("express");
const router = express.Router();
const taskController = require("../controller/tasksController");

router.get("/getTask", taskController.getTasks);
router.post("/createTask", taskController.createTask);
router.put("/updateTask", taskController.updateTask);
router.delete("/deleteTask", taskController.deleteTask);

module.exports = router;
