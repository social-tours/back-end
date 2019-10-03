const router = require("express").Router();

const sendEmail = require("../services/sendEmail");
router.post("/", (req, res) => {
  const { emails, subject, message } = req.body;
});

module.exports = router;
