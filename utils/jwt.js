const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
	return token;
};

const isTokenValid = ({ token }) =>
	jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
	const token = createJWT({ payload: user });

	const oneMonth = 1000 * 60 * 60 * 24 * 30;

	res.cookie("token", token, {
		httpOnly: true,
		expires: new Date(Date.now() + oneMonth),
		secure: true,
		// secure: process.env.NODE_ENV === "production",
		sameSite: "none",
		signed: true,
	});
	// res.send("cookie set");
};

module.exports = {
	createJWT,
	isTokenValid,
	attachCookiesToResponse,
};
