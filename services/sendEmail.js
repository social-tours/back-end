require("dotenv");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const sgName = process.env.SG_USER;
const sgPass = process.env.SG_PW;

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
				api_user: sgName,
				api_key: sgPass
			}
		})
	);

	const options = {
		to: recipients,
		from: process.env.GMAIL_NAME,
		subject: subject || "An influencer you follow has a new event!",
		html: message.html || "Log in for more details!",
		text: message.text || "Log in for more details" // TODO: Create email template
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
		//return false;
	}
};

module.exports = sendMail;
