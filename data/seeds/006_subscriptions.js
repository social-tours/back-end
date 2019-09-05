exports.seed = async function(knex) {
	await knex("Subscriptions").insert([
		{
			id: 1,
			user_id: 1, // FK ID in 'Users' table
			influencer_id: 1 // FK ID in 'Users' table
		}
	]);

	await knex.raw(
		`SELECT setval(('"Subscriptions_id_seq"'::regclass), (SELECT MAX(id) from "Subscriptions"))`
	);
};
