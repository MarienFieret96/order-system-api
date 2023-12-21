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

router.route("/").post(createOrder);

router.route("/ordersOfThisDay/:id").get(getAllOrders);

router.route("/:id").get(getSingleOrder).patch(updateOrder).delete(deleteOrder);

module.exports = router;

// authenticateUser, 16
// authenticateUser, authorizePermissions("admin"), 20
// authenticateUser, 24 25
// [authenticateUser, authorizePermissions("admin")], 26
