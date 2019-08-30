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

/**
 * Method to retrieve a specific schedule from the database
 * @param {number} scheduleId
 * @returns sends the specific schedule as a response
 */
router.get("/:scheduleId", async (req, res) => {
	const { scheduleId } = req.params;
	try {
		const data = await db.findById("Schedules", scheduleId);
		if (data) {
			res.send(data);
		} else {
			res.status(404).json({ message: `Record ${scheduleId} not found` });
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

module.exports = router;
