const mongoose = require("mongoose");

const GewichtSchema = mongoose.Schema({
	hoeveelheid: { type: Number },
	delen: { type: Number },
});

const SingleOrderItemSchema = mongoose.Schema({
	id: {
		type: String,
		required: true,
	},
	naam: {
		type: String,
		required: true,
	},
	prijs: {
		type: Number,
		required: true,
	},

	gewicht: GewichtSchema,
	stuks: { type: Number, required: true },
	keuzes: { type: Array, required: false },
	opmerkingen: {
		type: String,
		required: false,
	},
	stukPrijs: {
		type: String,
		enum: ["stuk", "gewicht"],
		required: true,
	},
	product: {
		type: mongoose.Schema.ObjectId,
		ref: "Product",
		required: true,
	},
	itemIndex: {
		type: Number,
		required: true,
	},
	ingepakt: {
		type: Boolean,
		default: false,
	},
	locatie: {
		type: String,
		enum: [
			"Koelkast voor",
			"Koelkast achter",
			"Vriezer voor",
			"Kleine vriezer",
			"Vriezer achter",
			"Koelkast vloer zalm",
			"Koelkast vloer saus",
			"Koelkast vloer kibbeling",
			"Koelkast vloer marinade",
		],
		default: "Koelkast voor",
	},
});

const OrderSchema = mongoose.Schema(
	{
		naam: {
			type: String,
			required: true,
		},
		telefoon: {
			type: Number,
		},
		orderItems: [SingleOrderItemSchema],
		status: {
			type: String,
			enum: ["aangenomen", "inpakken", "ingepakt", "opgehaald"],
			default: "aangenomen",
		},
		betaalStatus: {
			type: String,
			required: true,
		},
		opmerking: {
			type: String,
		},
		datum: {
			type: Date,
			required: true,
		},
		aangenomenDoor: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
