require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
app
	.use(express.json())
	.use(cors({ credentials: true, origin: process.env.ORIGIN }));

// LOGIN-REGISTER
app.use("/login/*", login);
app.use("/register/*", register);

// Database Connection
app.listen(process.env.PORT, () => {
	mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => {
			console.log("successfully connected to database");
		})
		.catch((error) => {
			console.error("error connecting to database: ", error);
		});
});
