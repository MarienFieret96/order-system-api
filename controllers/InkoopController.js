const Inkoop = require("../models/Inkoop");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createNewLeverancier = async (req, res) => {
	const newLeverancier = await Inkoop.create(req.body);
	res.status(StatusCodes.CREATED).json({ newLeverancier });
};

const getAllInkoopProducts = async (req, res) => {
	const inkoopProducten = await Inkoop.find({});
	res.status(StatusCodes.OK).json({ inkoopProducten });
};

const updateInkoopProduct = async (req, res) => {
	const { id: inkoopId } = req.params;
	const inkoopProduct = await Inkoop.findOneAndUpdate(
		{ _id: inkoopId },
		req.body,
		{ new: true, runValidators: true },
	);
	if (!inkoopProduct) {
		throw new CustomError.NotFoundError(
			`Geen inkoopproduct met id : ${inpakId}`,
		);
	}
	res.status(StatusCodes.OK).json({ inkoopProduct });
};

module.exports = {
	createNewLeverancier,
	getAllInkoopProducts,
	updateInkoopProduct,
};
