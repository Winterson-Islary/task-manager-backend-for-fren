const jwt = require("jsonwebtoken");
const genToken = require("../helpers/genTokens");

const authMiddleware = async (req, res, next) => {
	try {
		// const token = req.headers.authorization?.split(" ")[1];
		const token = req.cookies.ACCESS_TOKEN;
		const refresh_token = req.cookies.REFRESH_TOKEN;
		const verified_access = token ? await verifyToken(token) : false;
		const verified_refresh = refresh_token
			? await verifyToken(refresh_token)
			: false;
		if (!verified_access && !verified_refresh) {
			return res.status(403).json({
				message: "unauthorized",
			});
		}
		if (!verified_access && verified_refresh) {
			const data = {
				id: verified_refresh.id,
				name: verified_refresh.name,
				email: verified_refresh.email,
			};
			res.cookie(ACCESS_TOKEN, genToken.generateAccessToken(data), {
				httpOnly: true,
				secure: true,
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
		if (!verification) {
			return false;
		}
		return verification;
	} catch (error) {
		return false;
	}
}

module.exports = authMiddleware;
