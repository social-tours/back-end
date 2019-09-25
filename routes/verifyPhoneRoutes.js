const router = require("express").Router();

const verifyPhone = require("../services/verifyPhone");

router.get("/:number", async (req, res) => {
	try {
		const valid = await verifyPhone(req.params.number);
		console.log("VALIDATE PHONE NUMBER: ", valid);
		res.send({ valid });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("An unexpected error occurred");
	}
});

module.exports = router;
