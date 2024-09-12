const mongoose = require("mongoose");

const PrijsSchema = mongoose.Schema({
	gemiddeldGewicht: {
		type: Number,
	},
	perStuk: {
		type: Boolean,
	},
	prijs: {
		type: Number,
	},
});

const SingleOrderItemSchema = mongoose.Schema({
	product: {
		type: mongoose.Schema.ObjectId,
		ref: "Product",
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
	naam: {
		type: String,
		required: true,
	},
	totaalPrijs: {
		type: Number,
		required: true,
	},
	gewicht: {
		type: String,
	},
	delen: {
		type: String,
	},
	aantal: { type: Number, required: true },
	opties: { type: Array, required: false },
	productOpmerking: {
		type: String,
		required: false,
	},
	prijs: PrijsSchema,
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
			enum: [
				"aangenomen",
				"inpakken",
				"ingepakt",
				"opgehaald",
			],
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
