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

/**
 * Method to add one schedule to the database
 * @param {object} req.body
 * @returns newly created record
 */
router.post("/", async (req, res) => {
	try {
		const data = await db.addRecord("Schedules", req.body);
		if (data) {
			res.status(201).send(data);
		} else {
			res.status(400).json({ message: "Could not create record" });
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

/**
 * Method to edit a schedule
 * @param {number} scheduleId
 * @param {object} req.body
 * @returns updated record
 */
router.put("/:scheduleId", async (req, res) => {
	const { scheduleId } = req.params;
	try {
		const data = await db.updateRecord("Schedules", scheduleId, req.body);
		if (data) {
			res.send(data);
		} else throw err;
	} catch (err) {
		res.status(500).send(err.message);
	}
});

module.exports = router;
