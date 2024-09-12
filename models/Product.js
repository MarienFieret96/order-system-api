const mongoose = require("mongoose");

const SelectSchema = new mongoose.Schema({
	antwoord: { type: Array },
	vraag: { type: String },
});
const OptiesSchema = new mongoose.Schema({
	select: [SelectSchema],
	check: { type: Array },
});

const PrijsSchema = new mongoose.Schema({
	perStuk: { type: Boolean },
	prijs: { type: Number },
	gemiddeldGewicht: { type: Number },
});

// const relatedProductSchema = new mongoose.Schema({
// 	naam: { type: String },
// 	categorie: { type: String },
// 	slug: { type: String },
// });

const ProductSchema = new mongoose.Schema(
	{
		naam: {
			type: String,
			trim: true,
			required: [true, "Voeg een naam toe"],
			maxlength: [
				100,
				"Naam kan niet langer zijn dan 100 tekens",
			],
		},
		slug: {
			type: String,
		},
		prijs: {
			type: PrijsSchema,
			required: true,
		},
		beschrijving: {
			type: Array,
			required: [true, "Voeg een beschrijving toe"],
		},
		opVoorraad: {
			type: Boolean,
		},
		leverancier: {
			type: String,
			enum: ["adri", "volfood", "marien", "overig"],
			required: true,
		},
		allergenen: {
			type: Array,
			required: true,
		},
		opties: {
			type: OptiesSchema,
		},
		categorie: {
			type: String,
			required: true,
			enum: [
				"Verse vis",
				"Verse filet",
				"Maaltijden",
				"Kant en klaar",
				"Schotels",
				"Schaal- en schelpdieren",
				"Oesters",
				"Gerookte vis",
				"Salades",
				"Broodjes",
				"Gebakken vis",
				"Sauzen",
				"Zeewierproducten",
				"Soepen",
				"Diepvries",
				"Conserven",
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
		wijn: {
			type: Array,
		},
		smallImage: {
			type: String,
			default:
				"https://images.pexels.com/photos/229789/pexels-photo-229789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		},
		bigImage: {
			type: Array,
			default:
				"https://images.pexels.com/photos/229789/pexels-photo-229789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
		},
		relatedProducts: {
			type: Array,
		},
		bereidingsWijze: { type: Array },
		bewaarAdvies: { type: String },
		korting: { type: String },
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model("Product", ProductSchema);
