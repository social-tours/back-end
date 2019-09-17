exports.seed = async function(knex) {
	// Enable update of ID sequence
	await knex.raw(
		`SELECT setval(('"EventTypes_id_seq"'::regclass), (SELECT MAX(id) from "UserTypes"))`
	);
};
