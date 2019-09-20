const router = require("express").Router();

// Import data models
const db = require("../data/models");
const jwtCheck = require('../auth/tokenService');

// Load middleware

/**
 * Method to retrieve all subscriptions from the database
 * @returns sends all subscriptions in the database as a response
 */

router.get("/", jwtCheck, async (req, res) => {
	try {
		const data = await db.findAll("Subscriptions");
		res.send(data);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

/**
 * Method to retrieve a subscriptions for a specific user from the database
 * @param {number} userId
 * @returns sends the specific schedule as a response
 */
router.get("/:userId", jwtCheck, async (req, res) => {
	const { userId } = req.params;
	try {
		const data = await db.findAllbyId("Subscriptions", userId);
		if (data) {
			res.send(data);
		} else {
			res.status(404).json({ message: `Record ${userId} not found` });
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

module.exports = Router;