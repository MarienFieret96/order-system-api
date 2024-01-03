const express = require("express");
const router = express.Router();
const {
	authenticateUser,
	authorizePermissions,
} = require("../middleware/authentication");

const {
	getAllOrders,
	getSingleOrder,
	createOrder,
	updateOrder,
	deleteOrder,
} = require("../controllers/orderController");

router.route("/").post(authenticateUser, createOrder);

router
	.route("/ordersOfThisDay/:id")
	.get(authenticateUser, authorizePermissions("admin"), getAllOrders);

router
	.route("/:id")
	.get(authenticateUser, getSingleOrder)
	.patch(authenticateUser, updateOrder)
	.delete([authenticateUser, authorizePermissions("admin")], deleteOrder);

module.exports = router;

// authenticateUser, 16
// authenticateUser, authorizePermissions("admin"), 20
// authenticateUser, 24 25
// [authenticateUser, authorizePermissions("admin")], 26
