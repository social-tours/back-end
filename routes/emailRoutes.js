const router = require("express").Router();

const sendEmail = require("../services/sendEmail");

router.post("/", async (req, res) => {
  const { emails, subject, message } = req.body;
  try {
    const result = await sendEmail(emails, subject, message);
    console.log("Result " + result);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
