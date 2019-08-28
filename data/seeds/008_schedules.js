exports.seed = async function(knex) {
	await knex("Schedules").insert([
		{
			id: 1,
			event_id: 1, // FK ID in 'Events' table
			sequence: 1,
			title: "Bifunkal",
			description: "Blues band from Chicago",
			location: "House of Blues",
			city: "Chicago",
			postal_code: "60654",
			country: "USA",
			start_date_time: "2019-09-05 05:00 PM",
			end_date_time: "2019-09-05 08:00 PM",
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		}
	]);
};
