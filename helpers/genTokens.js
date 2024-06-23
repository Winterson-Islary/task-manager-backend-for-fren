const jwt = require("jsonwebtoken");
const generateAccessToken = (data) => {
	const accessToken = jwt.sign({ data }, process.env.JWT_ACCESS_SECRET, {
		expiresIn: "15m",
	});
	return accessToken;
};
const generateRefreshToken = (data) => {
	const refreshToken = jwt.sign({ data }, process.env.JWT_REFRESH_SECRET, {
		expiresIn: "30d",
	});
	return refreshToken;
};
module.exports = { generateAccessToken, generateRefreshToken };
