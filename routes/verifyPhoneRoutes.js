const router = require("express").Router();

const verifyPhone = require("../services/verifyPhone");

router.get("/:number", async (req, res) => {
	try {
		const valid = await verifyPhone(req.params.number);
		console.log("VALIDATE PHONE NUMBER: ", valid);
		res.send({ valid });
	} catch (err) {
		console.log("Internal server error: ", err);
		return res
			.status(500)
			.json({ message: "Internal server error.", error: err });
	}
});

module.exports = router;
