const express = require("express");
const router = express.Router();
const {
	authenticateUser,
	authorizePermissions,
} = require("../middleware/authentication");

const {
	createNewLeverancier,
	getAllInkoopProducts,
	updateInkoopProduct,
} = require("../controllers/InkoopController");

router
	.route("/")
	.post(
		[authenticateUser, authorizePermissions("admin")],
		createNewLeverancier,
	)
	.get(
		[authenticateUser, authorizePermissions("admin")],
		getAllInkoopProducts,
	);
router
	.route("/:id")
	.patch(
		[authenticateUser, authorizePermissions("admin")],
		updateInkoopProduct,
	);

module.exports = router;
