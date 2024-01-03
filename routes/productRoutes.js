const express = require("express");
const router = express.Router();
const {
	authenticateUser,
	authorizePermissions,
} = require("../middleware/authentication");

const {
	createProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController");

router
	.route("/")
	.post([authenticateUser, authorizePermissions("admin")], createProduct)
	.get(getAllProducts);

router
	.route("/:id")
	.patch([authenticateUser, authorizePermissions("admin")], updateProduct)
	.delete([authenticateUser, authorizePermissions("admin")], deleteProduct);

module.exports = router;

// [authenticateUser, authorizePermissions("admin")], 17
// [authenticateUser, authorizePermissions("admin")], 22
// [authenticateUser, authorizePermissions("admin")], 23
