const router = require("express").Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;

router.get("/", (req, res) => {
	res.send({ message: "SMS endpoint" });
});

router.post("/", (req, res) => {
	console.log("INCOMING SMS params: ", req.body);
	const twiml = new MessagingResponse();
	twiml.message(
		`Message: '${req.body.Body}' from ${req.body.From} successfully received`
	);
	res.send(twiml.toString());
});

module.exports = router;
