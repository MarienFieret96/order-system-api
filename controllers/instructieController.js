const Instructie = require("../models/Instructie");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createInstructie = async (req, res) => {
	const instructie = await Instructie.create(req.body);
	res.status(StatusCodes.CREATED).json({ instructie });
};

const getAllInstructies = async (req, res) => {
	const instructies = await Instructie.find({});
	res.status(StatusCodes.OK).json({ instructies });
};

const updateInstructie = async (req, res) => {
	const { id: instructieId } = req.params;
	const instructie = await Instructie.findOneAndUpdate(
		{
			_id: instructieId,
		},
		req.body,
		{
			new: true,
			runValidators: true,
		},
	);
	if (!instructie) {
		throw new CustomError.NotFoundError(
			`Geen instructielijst met id: ${instructieId}`,
		);
	}
	res.status(StatusCodes.OK).json({ instructie });
};

const deleteInstructie = async (req, res) => {
	const { id: instructieId } = req.params;
	const instructie = await Instructie.findOne({
		_id: instructieId,
	});

	if (!instructie) {
		throw new CustomError.NotFoundError(
			`Geen instructielijst met id: ${instructieId}`,
		);
	}
	await instructie.remove();
	res
		.status(StatusCodes.OK)
		.json({ msg: "Instructielijst verwijderd" });
};

module.exports = {
	createInstructie,
	getAllInstructies,
	updateInstructie,
	deleteInstructie,
};
