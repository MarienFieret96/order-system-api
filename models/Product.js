const mongoose = require("mongoose");

const CheckboxSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	checked: {
		type: Boolean,
		required: true,
	},
});

const ProductSchema = new mongoose.Schema(
	{
		naam: {
			type: String,
			trim: true,
			required: [true, "Voeg een naam toe"],
			maxlength: [100, "Naam kan niet langer zijn dan 100 tekens"],
		},
		prijs: {
			type: Number,
			required: [true, "Voeg een prijs toe"],
		},
		beschrijving: {
			type: String,
			required: [true, "Voeg een beschrijving toe"],
			maxlength: [1000, "Beschrijving kan niet langer dan 1000 tekens zijn"],
		},
		stukPrijs: {
			type: String,
			enum: ["stuk", "gewicht"],
			required: true,
		},
		leverancier: {
			type: String,
			enum: ["adri", "volfood", "marien", "overig"],
			required: true,
		},
		allergenen: {
			type: [CheckboxSchema],
			required: true,
		},
		opties: {
			type: Array,
		},
		categorie: {
			type: String,
			required: true,
			enum: [
				"Verse vis",
				"Verse filet",
				"Kant en klaar",
				"Salades en sauzen",
				"Gerookte en gebakken vis",
				"Conserven",
				"Diepvries",
				"Schaal- en schelpdieren",
				"Wijnen",
				"Overig",
			],
		},
		herkomst: {
			type: String,
		},
		vangstmethode: {
			type: String,
			enum: ["aquacultuur", "wildvang", ""],
		},
		gerechten: {
			type: [CheckboxSchema],
		},
		saus: {
			type: [CheckboxSchema],
		},
		wijn: {
			type: [CheckboxSchema],
		},
		productIndex: {
			type: Number,
			required: true,
		},
		// user: {
		// 	type: mongoose.Types.ObjectId,
		// 	ref: "User",
		// 	required: true,
		// },
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Product", ProductSchema);
