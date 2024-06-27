const User = require("../models/user");
const bcrypt = require("bcrypt");
const genToken = require("../helpers/genTokens");

const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body; // validated data expected from the frontend
		if (!name || !email || !password) {
			return res.status(400).json({ message: "missing user info" });
		}
		const emailAlreadyInUse = await User.findOne({ email: email });
		if (emailAlreadyInUse) {
			return res.status(409).json({ message: "email already in use" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const userData = new User({
			name: name,
			email: email,
			password: hashedPassword,
		});
		await userData.save();
		return res.status(201).json({ message: "successful user registration" });
	} catch (error) {
		return res.status(500).json({ message: "unexpected server error" });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "missing user info" });
		}
		const userDetails = await User.findOne({ email: email });
		if (!userDetails) {
			return res.status(409).json({ message: "invalid user" });
		}
		const validPassword = await bcrypt.compare(password, userDetails.password);
		if (!validPassword) {
			return res.status(401).json({ message: "invalid credentials" });
		}
		const accessToken = genToken.generateAccessToken({
			id: userDetails._id,
			name: userDetails.name,
			email: userDetails.email,
		});
		const refreshToken = genToken.generateRefreshToken({
			id: userDetails._id,
			name: userDetails.name,
			email: userDetails.email,
		});
		res.cookie("ACCESS_TOKEN", accessToken, { httpOnly: true, secure: true });
		res.cookie("REFRESH_TOKEN", refreshToken, { httpOnly: true, secure: true });
		return res.status(200).json({ message: "login successful" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "unexpected server error" });
	}
};

module.exports = { registerUser, loginUser };
