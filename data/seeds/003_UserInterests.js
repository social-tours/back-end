exports.seed = async function(knex) {
	// Insert seed entries
	await knex("Interests").insert([
		{
			id: 1,
			name: "Netflix Binging"
		},
		{
			id: 2,
			name: "Weightlifting"
		},
		{
			id: 3,
			name: "Music"
		}
	]);

	await knex.raw(
		`SELECT setval(('"Interests_id_seq"'::regclass), (SELECT MAX(id) from "Interests"))`
	);

	await knex("UserInterests").insert([
		{ id: 1, user_id: 2, interest_id: 1 },
		{ id: 2, user_id: 3, interest_id: 2 },
		{ id: 3, user_id: 1, interest_id: 3 }
	]);

	await knex.raw(
		`SELECT setval(('"UserInterests_id_seq"'::regclass), (SELECT MAX(id) from "UserInterests"))`
	);
};
