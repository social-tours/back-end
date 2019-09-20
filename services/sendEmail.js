const keys = require("../config/keys");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

const sendMail = (recipients, message) => {
	const transporter = nodemailer.createTransport(
		sgTransport({
			auth: {
				api_user: keys.sgUser,
				api_key: keys.sgPW
			}
		})
	);

	const options = {
		to: recipients,
		from: keys.gmailName,
		subject: "An influencer you follow has a new event!",
		html: "Log in to view the event" // TODO: Create email template
	};

	try {
		transporter.sendMail(options, (err, resp) => {
			if (err) {
				console.log("Something went wrong: ", err);
				return false;
			} else {
				console.log("Email sent!", resp);
			}
		});
	} catch (err) {
		console.log("Something went wrong: ", err);
		return false;
	}

	return true;
};

module.exports = sendMail;
