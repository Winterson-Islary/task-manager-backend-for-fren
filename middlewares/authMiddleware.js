const jwt = require("jsonwebtoken");
const genToken = require("../helpers/genTokens");

const authMiddleware = async (req, res, next) => {
	try {
		// const token = req.headers.authorization?.split(" ")[1];
		const token = req.cookies.ACCESS_TOKEN;
		const refresh_token = req.cookies.REFRESH_TOKEN;
		const verified_access = token ? await verifyToken(token, "access") : false;
		const verified_refresh = refresh_token
			? await verifyToken(refresh_token, "refresh")
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
			res.cookie("ACCESS_TOKEN", genToken.generateAccessToken(data), {
				httpOnly: true,
				secure: true,
			});
			res.userId = verified_refresh.id; // To also pass the { _id } to the receiver
		}
	} catch (error) {
		return res.status(401).json({
			message: "unauthorized or invalid token",
		});
	}
	next();
};

async function verifyToken(token, Tokentype) {
	try {
		const TokenSecret =
			Tokentype === "access"
				? process.env.JWT_ACCESS_SECRET
				: Tokentype === "refresh"
					? process.env.JWT_REFRESH_SECRET
					: "JUNK";
		const verification = await jwt.verify(token, TokenSecret);

		if (!verification) {
			return false;
		}
		return verification;
	} catch (error) {
		return false;
	}
}

module.exports = authMiddleware;
