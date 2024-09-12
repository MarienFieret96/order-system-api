const express = require("express");
const router = express.Router();
const {
	authenticateUser,
	authorizePermissions,
} = require("../middleware/authentication");

const {
	createInpakProduct,
	getAllInpakProducts,
	updateInpakProduct,
	deleteInpakProduct,
} = require("../controllers/inpakController");

router
	.route("/")
	.post(
		[authenticateUser, authorizePermissions("admin")],
		createInpakProduct,
	)
	.get(
		[authenticateUser, authorizePermissions("admin")],
		getAllInpakProducts,
	);

router
	.route("/:id")
	.patch(
		[authenticateUser, authorizePermissions("admin")],
		updateInpakProduct,
	)
	.delete(
		[authenticateUser, authorizePermissions("admin")],
		deleteInpakProduct,
	);

module.exports = router;
