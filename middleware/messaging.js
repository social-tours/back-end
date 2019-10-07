// Import data models
const { db } = require("../data/models");
const sendEmail = require("../services/sendEmail");
const sendSms = require("../services/sendSms");

/**
 *
 * @param {*} influencerId
 * @param {*} content
 */
async function messagingHandler(influencerId, content) {
	try {
		const data = await db("Users")
			.innerJoin("Subscriptions", "Users.id", "Subscriptions.user_id")
			.select(
				"Users.id",
				"Users.first_name",
				"Users.last_name",
				"Users.email",
				"Users.phone_nbr",
				"Subscriptions.influencer_id",
				"Users.comm_preference"
			)
			.where({ influencer_id: influencerId })
			.whereNot({ comm_preference: 0 });
		console.log(`messagingHandler ${content}: `, data);

		selectMessagingService(data, content);
	} catch (error) {
		console.error(error);
		return { message: "Database query error occured", error };
	}
}

/**
 *
 * @param {array} users
 * @param {string} content
 */
function selectMessagingService(users, content) {
	for (let user of users) {
		switch (user.comm_preference) {
			case 1:
				if (user.email) {
					console.log(`send email to ${user.email}: ${content}`);
					sendEmail(user.email, content);
				} else {
					console.log("Invalid email address");
					return "Invalid email address";
				}

			case 2:
				if (user.phone_nbr) {
					console.log(`send sms to ${user.phone_nbr}: ${content}`);
					sendSms(user.phone_nbr, content);
				} else {
					console.log("Invalid phone number");
					return "Invalid phone number";
				}

			case 3:
				if (user.email && user.phone_nbr) {
					console.log(
						`send to both ${user.email} and ${user.phone_nbr}: ${content}`
					);
					sendEmail(user.email, content);
					sendSms(user.phone_nbr, content);
				} else if (user.email) {
					console.log(`send email to ${user.email}: ${content}`);
					sendEmail(user.email, content);
				} else if (user.phone_nbr) {
					console.log(`send sms to ${user.phone_nbr}: ${content}`);
					sendSms(user.phone_nbr, content);
				} else {
					console.log("Invalid phone number");
					return "Invalid phone number";
				}

			default:
				console.log("no message sent");
				return;
		}
	}
}
// Test command
messagingHandler(process.argv[2], process.argv[3]);
module.exports = messagingHandler;
