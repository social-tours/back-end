const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const verifyPhone = require("./verifyPhone");

/**
 * Function which takes a message and
 * sends it via SMS to specified phone number
 * @param {string} message
 * @param {e.164 phone number format} userPhone
 */
async function sendText(message, userPhone) {
	try {
		const isValid = await verifyPhone(userPhone);

		if (isValid) {
			sendMessage = await client.messages.create({
				body: message,
				from: process.env.TWILIO_PHONE_NBR,
				to: userPhone
			});
			console.log("sendMessage.sid: ", sendMessage.sid);
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

sendText(process.argv[2], process.argv[3]);
