exports.seed = async function(knex) {
	await knex("Sales").insert([
		{
			id: 1,
			ticket_id: "1", // FK ID in 'Tickets' table
			sale_amount: 49.99
		}
	]);

	await knex.raw(
		`SELECT setval(('"Sales_id_seq"'::regclass), (SELECT MAX(id) from "Sales"))`
	);
};
