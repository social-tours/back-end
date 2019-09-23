const router = require("express").Router();
const MessagingResponse = require("twilio").twiml.MessagingResponse;

router.post("/sms", (req, res) => {
	const twiml = new MessagingResponse();

	twiml.message("The Robots are coming! Head for the hills!");
	res.send(twiml);
});

module.exports = router;
