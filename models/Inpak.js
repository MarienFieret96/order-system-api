const mongoose = require("mongoose");

const InpakDataSchema = mongoose.Schema({
	inpakdatum: {
		type: Date,
		required: true,
	},
	houdbaarheidsdatum: {
		type: Date,
		required: true,
	},
	werknemer: {
		type: String,
		required: true,
	},
	aantal: {
		type: Number,
		required: true,
	},
	afval: {
		type: Number,
	},
});

const InpakProductenSchema = mongoose.Schema({
	naam: {
		type: String,
		required: true,
	},
	data: [InpakDataSchema],
});

module.exports = mongoose.model(
	"Inpak",
	InpakProductenSchema,
);
