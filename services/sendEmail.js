const keys = require("../config/keys");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

/**
 * Function which emails event notifications
 * to Followers
 * @param {string} recipients
 * @param {string} message
 * @param {string} subject
 * @returns email message to Followers
 */
const sendMail = (recipients, message, subject) => {
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
		subject: subject || "An influencer you follow has a new event!",
		html: message || "Log in for more details!" // TODO: Create email template
	};

	try {
		transporter.sendMail(options, (err, resp) => {
			if (err) {
				console.log("Error received from server: ", err);
				return false;
			} else {
				console.log("Email sent!", resp);
			}
		});
	} catch (err) {
		console.log("Could not send email: ", err);
		return false;
	}

	return true;
};

module.exports = sendMail;
