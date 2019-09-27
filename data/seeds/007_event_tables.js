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
			type: 1,
			title: "See Bifunkal Orchestra",
			description: "Orchestrated Blues and Funk",
			event_image: "Bifunkal Image Here",
			capacity: 5000
		},
		{
			id: 2,
			type: 1,
			title: "TEDx Muncie",
			description: "TEDx event in Muncie, Indiana",
			event_image: "TEDx logo",
			capacity: 350
		},
		{
			id: 3,
			type: 1,
			title: "Hair and back again with Kylie Jenner",
			description: "Kylie Jenner Fan Club Meetup",
			event_image: "KJ logo",
			capacity: 3000
		},
		{
			id: 4,
			type: 1,
			title: "Nerd Fitness Bootcamp",
			description: "Nerd Fitness Reloaded Bootcamp Tour",
			event_image: "NF logo url",
			capacity: 50
		}
	]);

	await knex.raw(
		`SELECT setval(('"Events_id_seq"'::regclass), (SELECT MAX(id) from "Events"))`
	);
};
