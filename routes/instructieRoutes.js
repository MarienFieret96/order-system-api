const express = require("express");
const router = express.Router();
const {
	authenticateUser,
	authorizePermissions,
} = require("../middleware/authentication");
const {
	createInstructie,
	getAllInstructies,
	updateInstructie,
	deleteInstructie,
} = require("../controllers/instructieController");

router
	.route("/")
	.post(
		[authenticateUser, authorizePermissions("admin")],
		createInstructie,
	)
	.get(getAllInstructies);

router
	.route("/:id")
	.patch(
		[authenticateUser, authorizePermissions("admin")],
		updateInstructie,
	)
	.delete(
		[authenticateUser, authorizePermissions("admin")],
		deleteInstructie,
	);

module.exports = router;
