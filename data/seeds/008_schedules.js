exports.seed = async function(knex) {
	await knex("Schedules").insert([
		{
			id: 1,
			event_id: 1, // FK ID in 'Events' table
			sequence: 1,
			title: "Bifunkal Event Schedule",
			description: "Blues band from Chicago",
			location: "House of Blues",
			city: "Chicago",
			postal_code: "60654",
			country: "USA",
			start_date_time: "2019-09-25 05:00 PM",
			end_date_time: "2019-09-25 08:00 PM"
		}
	]);

	await knex.raw(
		`SELECT setval(('"Schedules_id_seq"'::regclass), (SELECT MAX(id) from "Schedules"))`
	);
};
