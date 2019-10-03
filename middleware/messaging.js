// Import data models
const { db } = require("../data/models");

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

		selectMessageService(data);
	} catch (error) {
		console.error(error);
		return { message: "Database query error occured", error };
	}
}

/**
 *
 * @param {*} users
 */
function selectMessagingService(users) {
	for (let user of users) {
		switch (user.comm_preference) {
			case 1:
				console.log("send email");
				return "send email";
			case 2:
				console.log("send sms");
				return "send sms";
			case 3:
				console.log("send both");
				return "send both";
			default:
				console.log("no message sent");
				return;
		}
	}
}
// Test command
messagingHandler(process.argv[2], process.argv[3]);
module.exports = messagingHandler;
