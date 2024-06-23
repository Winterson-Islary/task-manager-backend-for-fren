const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		const verified = token ? await verifyToken(token) : false;
		if (!verified) {
			return res.status(403).json({
				message: "unauthorized",
			});
		}
	} catch (error) {
		return res.status(401).json({
			message: "unauthorized or invalid token",
		});
	}
	next();
};

async function verifyToken(token) {
	try {
		const verification = await jwt.verify(token, process.env.JWT_SECRET);
		return true;
	} catch (error) {
		return false;
	}
}

module.exports = authMiddleware;
