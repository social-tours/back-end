const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const verifyPhone = require("./verifyPhone");

/**
 * Function which sends SMS via Twilio API
 * @param {string} message
 * @param {string} userPhone
 * @returns SMS message
 */
async function sendText(userPhone, message) {
	try {
		const isValid = await verifyPhone(userPhone);

		if (isValid) {
			sendMessage = await client.messages.create({
				to: userPhone,
				from: process.env.TWILIO_PHONE_NBR,
				body: message
			});
			console.log("SMS sent!: ", sendMessage.sid);
			if (sendMessage.sid) return sendMessage.sid;
			else throw err;
		} else {
			return { message: "Invalid phone number" };
		}
	} catch (err) {
		console.error(err);
		return { message: "An error occured" };
	}
}

module.exports = sendText;
