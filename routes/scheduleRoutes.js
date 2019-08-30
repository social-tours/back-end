const router = require("express").Router();

// Import data models
const db = require("../data/models");

// Load middleware

/**
 * Method to retrieve all event schedules from the database
 * @returns sends all schedules in the database as a response
 */

router.get("/", async (req, res) => {
	try {
		const data = await db.findAll("Schedules");
		res.send(data);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

module.exports = router;
