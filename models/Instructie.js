const mongoose = require("mongoose");

const InstructieSchema = new mongoose.Schema({
	titel: {
		type: String,
		required: true,
	},
	benodigdheden: {
		type: Array,
		required: true,
	},
	instructies: {
		type: Array,
		required: true,
	},
	bereidingstijd: {
		type: String,
	},
});

module.exports = mongoose.model(
	"Instructie",
	InstructieSchema,
);
