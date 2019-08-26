exports.seed = async function(knex) {
	await knex("Sales").insert([
		{
			id: 1,
			ticket_id: "1", // FK ID in 'Tickets' table
			sale_amount: 49.99,
			created_at: "2019-08-14",
			updated_at: "2019-08-15"
		}
	]);
};
