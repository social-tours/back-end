exports.up = async function(knex) {
	await knex.schema.table("Users", tbl => {
		tbl.string("auth0_token");
	});
};

exports.down = async function(knex) {
	await knex.schema.table("Users", tbl => {
		tbl.dropColumn("auth0_token");
	});
};
