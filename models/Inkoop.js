const mongoose = require("mongoose");

const InkoopDataSchema = mongoose.Schema({
	naam: {
		type: String,
		required: true,
	},
	voorraad: {
		type: Number,
		required: true,
	},
	threshold: {
		type: Number,
		required: true,
	},
});

const InkoopProductenSchema = mongoose.Schema({
	leverancier: {
		type: String,
		required: true,
	},
	producten: [InkoopDataSchema],
});

module.exports = mongoose.model(
	"Inkoop",
	InkoopProductenSchema,
);
