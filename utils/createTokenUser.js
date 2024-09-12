const createTokenUser = (user) => {
	return {
		naam: user.name,
		email: user.email,
		telefoon: user.telephone,
		role: user.role,
		userId: user._id,
	};
};

module.exports = createTokenUser;
