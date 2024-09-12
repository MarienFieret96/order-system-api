const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
	const token = req.signedCookies.token;

	if (!token) {
		throw new CustomError.UnauthenticatedError(
			"Authentication Invalid bruh",
		);
	}

	try {
		const { naam, email, telefoon, role, userId } =
			isTokenValid({
				token,
			});
		req.user = { naam, email, telefoon, role, userId };
		next();
	} catch (error) {
		throw new CustomError.UnauthenticatedError(
			"Authentication Invalid bro",
		);
	}
};

const authorizePermissions = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new CustomError.UnauthorizedError(
				"Unauthorized to access this route",
			);
		}
		next();
	};
};

module.exports = {
	authenticateUser,
	authorizePermissions,
};
