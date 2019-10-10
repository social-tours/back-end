const router = require("express").Router();

// Import data models
const db = require("../data/models");
const jwtCheck = require("../auth/tokenService");

// Load middleware

/**
 * Method to retrieve all subscriptions from the database
 * @returns sends all subscriptions in the database as a response
 */
router.get("/", async (req, res) => {
	try {
		const data = await db.findAll("Subscriptions");

		for (let sub of data) {
			let follower = await db.findById("Users", sub.user_id);
			let influencer = await db.findById("Users", sub.influencer_id);
			sub["follower_name"] = `${follower.first_name} ${follower.last_name}`;
			sub[
				"influencer_name"
			] = `${influencer.first_name} ${influencer.last_name}`;
		}
		res.send(data);
	} catch (err) {
		console.log("Internal server error: ", err);
		res.status(500).json({ message: "Internal server error.", error: err });
	}
});

/**
 * Method to retrieve a subscriptions for a specific user from the database
 * @param {number} userId
 * @returns sends the specific schedule as a response
 */
router.get("/:userId", async (req, res) => {
	const { userId } = req.params;
	try {
		const data = await db.findAllbyId("Subscriptions", "user_id", userId);
		if (data) {
			res.send(data);
		} else {
			res.status(404).json({ message: `Record ${userId} not found` });
		}
	} catch (err) {
		console.log("Internal server error: ", err);
		res.status(500).json({ message: "Internal server error.", error: err });
	}
});

router.put("/:id", async (req, res, next) => {
	const { id } = req.params;

	try {
		const data = await db.updateRecord("Subscriptions", id, req.body);
		if (data) {
			res.status(200).send(data);
		} else throw err;
	} catch (err) {
		console.log("Internal server error: ", err);
		res.status(500).json({ message: "Internal server error.", error: err });
	}
});

router.post("/", async (req, res) => {
	const { influencer_id, user_id } = req.body;

	try {
		const data = await db.addRecord("Subscriptions", {
			influencer_id: influencer_id,
			user_id: user_id
		});

		if (data) {
			res.send(data);
		} else throw err;
	} catch (err) {
		console.log("Internal server error: ", err);
		res.status(500).json({ message: "Internal server error.", error: err });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const data = await db.removeRecord("Subscriptions", id);

		if (data) {
			res.send(data);
		} else throw err;
	} catch (err) {
		console.log("Internal server error: ", err);
		res.status(500).json({ message: "Internal server error.", error: err });
	}
});
module.exports = router;
