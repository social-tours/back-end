exports.seed = async function(knex) {
	// Insert seed entries
	await knex("EventTypes").insert([
		{
			id: 1,
			description: "Concert",
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		}
	]);

	await knex.raw(
		`SELECT setval(('"EventTypes_id_seq"'::regclass), (SELECT MAX(id) from "EventTypes"))`
	);

	await knex("Events").insert([
		{
			id: 1,
			type: 1, // FK ID in 'EventTypes' table
			host_id: 2,
			title: "See Bifunkal Orchestra",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000
		}
	]);

	await knex.raw(
		`SELECT setval(('"Events_id_seq"'::regclass), (SELECT MAX(id) from "Events"))`
	);
};
