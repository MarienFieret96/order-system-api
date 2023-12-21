const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

//product aanmaken
const createProduct = async (req, res) => {
	req.body.user = req.user.userId;
	const product = await Product.create(req.body);
	res.status(StatusCodes.CREATED).json({ product });
};

//alle producten opvragen
const getAllProducts = async (req, res) => {
	const products = await Product.find({});
	res.status(StatusCodes.OK).json({ products, count: products.length });
};

//product wijzigen
const updateProduct = async (req, res) => {
	console.log(req.body);
	const { id: productId } = req.params;
	const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
		new: true,
		runValidators: true,
	});

	if (!product) {
		throw new CustomError.NotFoundError(`Geen product met id : ${productId}`);
	}

	res.status(StatusCodes.OK).json({ product });
};

//product verwijderen
const deleteProduct = async (req, res) => {
	const { id: productId } = req.params;

	const product = await Product.findOne({ _id: productId });

	if (!product) {
		throw new CustomError.NotFoundError(`Geen product met id : ${productId}`);
	}

	await product.remove();
	res.status(StatusCodes.OK).json({ msg: "Success! Product removed." });
};

module.exports = {
	createProduct,
	getAllProducts,
	updateProduct,
	deleteProduct,
};
