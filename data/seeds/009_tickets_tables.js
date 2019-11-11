exports.seed = async function(knex) {
	// Insert seed entries
	await knex("TicketTypes").insert([
		{
			id: 1,
			title: "1", // FK ID in 'Tickets' table
			price: 49.99
		}
	]);

	await knex.raw(
		`SELECT setval(('"TicketTypes_id_seq"'::regclass), (SELECT MAX(id) from "TicketTypes"))`
	);

	await knex("Tickets").insert([
		{
			id: 1,
			type: 1, // FK ID in 'TicketTypes' table
			user_id: 1, // FK ID in 'Users' table
			event_schedule_id: 1
		}
	]);

	await knex.raw(
		`SELECT setval(('"Tickets_id_seq"'::regclass), (SELECT MAX(id) from "Tickets"))`
	);
};
