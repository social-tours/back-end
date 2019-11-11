exports.seed = async function(knex) {
	// Insert seed entries
	await knex("EventTypes").insert([
		{
			id: 1,
			description: "Concert"
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
			event_image:
				"https://image-ticketfly.imgix.net/00/01/52/52/37-og.jpg?w=2048&h=2048",
			paid_event: true
		}
	]);

	await knex.raw(
		`SELECT setval(('"Events_id_seq"'::regclass), (SELECT MAX(id) from "Events"))`
	);
};
