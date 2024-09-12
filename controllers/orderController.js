const Order = require("../models/Order");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
const {
	startOfDay,
	endOfDay,
	formatISO,
	parseISO,
} = require("date-fns");

const createOrder = async (req, res) => {
	const {
		items: cartItems,
		betaalStatus,
		telefoon,
		naam,
		opmerking,
		datum,
		aangenomenDoor,
	} = req.body;

	if (!cartItems || cartItems.length < 1) {
		throw new CustomError.BadRequestError(
			"Geen producten in de winkelwagen",
		);
	}

	let orderItems = [];

	for (const item of cartItems) {
		const dbProduct = await Product.findOne({
			_id: item.product,
		});
		if (!dbProduct) {
			throw new CustomError.NotFoundError(
				`No product with id : ${item.product}`,
			);
		}

		// const { _id } = dbProduct;
		// const singleOrderItem = {
		// 	// id: item.id,
		// 	// naam: item.naam,
		// 	// prijs: item.prijs,
		// 	// gewicht: item.gewicht,
		// 	// stuks: item.stuks,
		// 	// keuzes: item.keuzes,
		// 	// opmerkingen: item.opmerkingen,
		// 	// product: _id,
		// 	// itemIndex: item.itemIndex,
		// 	// stukPrijs: item.stukPrijs,
		// 	id: item.id,
		// 	naam: item.naam,
		// };

		// voeg item toe aan order
		orderItems = [...orderItems, item];
	}

	const order = await Order.create({
		naam,
		telefoon,
		orderItems,
		status: "aangenomen",
		betaalStatus,
		opmerking,
		datum,
		aangenomenDoor,
	});

	res.status(StatusCodes.CREATED).json({ order });
};

const getAllOrders = async (req, res) => {
	const { id: date } = req.params;
	const day = parseInt(date.slice(0, 2));
	const month = parseInt(date.slice(3, 5));
	const year = parseInt(date.slice(6, 10));
	const datum = new Date(year, month - 1, day);
	const orders = await Order.find({
		datum: {
			$gte: startOfDay(datum),
			$lte: endOfDay(datum),
		},
	});
	res
		.status(StatusCodes.OK)
		.json({ orders, count: orders.length });
};

const getSingleOrder = async (req, res) => {
	const { id: orderId } = req.params;
	const order = await Order.findOne({ _id: orderId });
	if (!order) {
		throw new CustomError.NotFoundError(
			`Geen bestelling met id : ${orderId}`,
		);
	}
	res.status(StatusCodes.OK).json({ order });
};

const updateOrder = async (req, res) => {
	const { id: orderId } = req.params;
	const order = await Order.findOneAndUpdate(
		{ _id: orderId },
		req.body,
		{
			new: true,
			runValidators: true,
		},
	);
	if (!order) {
		throw new CustomError.NotFoundError(
			`Geen bestelling met id : ${orderId}`,
		);
	}
	res
		.status(StatusCodes.OK)
		.json({ order, msg: "Bestelling gewijzigd" });
};

const deleteOrder = async (req, res) => {
	const { id: orderId } = req.params;
	const order = await Order.findOne({ _id: orderId });
	if (!order) {
		throw new CustomError.NotFoundError(
			`Geen bestelling met id : ${orderId}`,
		);
	}
	await order.remove();
	res
		.status(StatusCodes.OK)
		.json({ msg: "Bestelling geannuleerd!" });
};

module.exports = {
	getAllOrders,
	getSingleOrder,
	createOrder,
	updateOrder,
	deleteOrder,
};
