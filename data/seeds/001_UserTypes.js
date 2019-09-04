exports.seed = async function(knex) {
	// Insert seed entries
	await knex("UserTypes").insert([
		{ id: 1, description: "Influencer" },
		{ id: 2, description: "Follower" }
	]);

	await knex.raw(
		`SELECT setval(('"UserTypes_id_seq"'::regclass), (SELECT MAX(id) from "UserTypes"))`
	);
};
