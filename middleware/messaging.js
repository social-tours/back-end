// Import data models
const { db } = require("../data/models");
const sendEmail = require("../services/sendEmail");
const sendSms = require("../services/sendSms");

/**
 * Function to retrieve and filter list of
 * followers based on communication preferences
 * @param {integer} influencerId
 * @param {string} content
 */
async function messagingHandler(influencerId, content) {
	try {
		const users = await db("Users")
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
			.where({ influencer_id: influencerId, marketing_opt_in: true })
			.whereNot({ comm_preference: 0 });
		console.log(`messagingHandler ${content}: `, users);

		selectMessagingService(users, content);
	} catch (error) {
		console.error(error);
		return { message: "Database query error occured", error };
	}
}

/**
 * Helper function to route and call messaging service
 * based on user's communication preferences
 * @param {array} users
 * @param {string} content
 */
function selectMessagingService(users, content) {
	for (let user of users) {
		if (user.comm_preference === 0) {
			console.log("Will not send notification");
			return "Will not send notification";
		} else if (user.comm_preference === 3) {
			if (user.email) {
				sendEmail(user.email, content);
			}
			if (user.phone_nbr) {
				sendSms(user.phone_nbr, content);
			}
		} else if (user.comm_preference === 2) {
			if (user.phone_nbr) {
				sendSms(user.phone_nbr, content);
			}
		} else if (user.comm_preference === 1) {
			if (user.email) {
				sendEmail(user.email, content);
			}
		} else {
			console.log("Unspecified communication preferences");
		}
	}
}

module.exports = messagingHandler;
