const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken).lookups.v1;

async function verifyPhone(phoneNumber) {
	try {
		const numberData = await client.phoneNumbers(phoneNumber).fetch();
		console.log(`LOOKUP NUMBER`, numberData);
		if (numberData) {
			return true;
		} else throw err;
	} catch (err) {
		console.error(err.message);
		return false;
	}
}

module.exports = verifyPhone;
