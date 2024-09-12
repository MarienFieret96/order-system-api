const Inpak = require("../models/Inpak");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createInpakProduct = async (req, res) => {
	const inpakProduct = await Inpak.create(req.body);
	res.status(StatusCodes.CREATED).json({ inpakProduct });
};

const getAllInpakProducts = async (req, res) => {
	const inpakProducts = await Inpak.find({});
	res.status(StatusCodes.OK).json({ inpakProducts });
};

const updateInpakProduct = async (req, res) => {
	const { id: inpakId } = req.params;
	const inpakProduct = await Inpak.findOneAndUpdate(
		{ _id: inpakId },
		req.body,
		{
			new: true,
			runValidators: true,
		},
	);
	if (!inpakProduct) {
		throw new CustomError.NotFoundError(
			`Geen inpakproduct met id : ${inpakId}`,
		);
	}
	res.status(StatusCodes.OK).json({ inpakProduct });
};

const deleteInpakProduct = async (req, res) => {
	const { id: inpakId } = req.params;
	const inpakProduct = await Inpak.findOne({
		_id: inpakId,
	});
	if (!inpakProduct) {
		throw new CustomError.NotFoundError(
			`Geen inpakproduct met id : ${inpakId}`,
		);
	}
	await inpakProduct.remove();
	res
		.status(StatusCodes.OK)
		.json({ msg: "Inpakproduct verwijderd" });
};

module.exports = {
	createInpakProduct,
	getAllInpakProducts,
	updateInpakProduct,
	deleteInpakProduct,
};
