const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../data/models");

/**
 * Method to retrieve all sales records from the database
 * @returns sends all sales in the database as a response
 */
router.get("/", async (req, res, next) => {
	try {
		let data = await db.findAll("Sales");

		res.status(200).send(data);
	} catch (err) {
		console.log("Internal server error: ", err);
		res.status(500).json({ message: "Internal server error.", error: err });
	}
});

/**
 * Method to retrieve a specific sale record from the database
 * @param {number} saleId
 * @returns rends the requested sale as a response
 */
router.get("/:saleId", async (req, res, next) => {
	const { saleId } = req.params;

	try {
		const sale = await db.findById("Sales", saleId);

		if (sale) {
			res.status(200).send(sale);
		} else {
			res.status(404).json({ message: `Record ${saleId} not found` });
		}
	} catch (err) {
		console.log("Internal server error: ", err);
		res.status(500).json({ message: "Internal server error.", error: err });
	}
});

/**
 * Method to edit a sale
 * @param {number} saleId
 * @returns message indicating edit was successful or not
 */
router.put("/:saleId", async (req, res, next) => {
	const { saleId } = req.params;

	const validFields = ["ticket_id", "sale_amount"];

	for (let key in req.body) {
		if (!validFields.includes(key)) {
			res.status(400).json({ message: "invalid data" });
		}
	}

	if (!req.body) {
		res.status(400).json({ message: "No data was submitted" });
	}

	if (typeof sale_amount === "string") {
		user_id = parseFloat(user_id, 10);
	}

	try {
		const data = await db.updateRecord("Sales", saleId, req.body);
		res.status(200).send(data);
	} catch (err) {
		console.log("Internal server error: ", err);
		res.status(500).json({ message: "Internal server error.", error: err });
	}
});

/**
 * Method to add sales to the database
 * @returns sends a response to the requester indicating whether or not record creation was successful
 */
router.post("/", async (req, res) => {
	console.log("Received payment request: ", req.body);
	const { amount, description, token } = req.body;
	// Payment processing flow
	try {
		const charge = await stripe.charges.create({
			amount,
			currency: "usd",
			description,
			source: token.id
		});
		if (charge) {
			console.log("Success", charge);
			const ticket = await db.addRecord("Tickets", {
				type,
				user_id,
				event_schedule_id
			});
			console.log("TICKET INFO: ", ticket);

			if (ticket) {
				const sale = await db.addRecord("Sales", {
					ticket_id: ticket.id,
					sale_amount: amount
				});
				console.log("SALE INFO: ", sale);
				res.send({ success: charge, ticket, sale });
			}
		} else throw error;
	} catch (error) {
		console.log("Internal server error: ", err);
		res.status(500).send({ message: "Internal server error.", error: error });
	}
});

/**
 * Method to remove a sale record from db
 * @returns sends a response to requester indicating whether or not deletion was successful
 */
router.delete("/:saleId", async (req, res, next) => {
	const { saleId } = req.params;

	try {
		const sale = await db.removeRecord("Sales", saleId);

		if (sale) {
			res
				.status(200)
				.send({ message: `successfully deleted sale - ${saleId}` });
		} else {
			res.status(400).json({ message: "not successful delete " });
		}
	} catch (err) {
		console.log("Internal server error: ", err);
		res.status(500).json({ message: "Internal server error.", error: err });
	}
});

module.exports = router;
