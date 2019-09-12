exports.up = async function(knex) {
	await knex.schema.table("Users", tbl => {
		tbl.string("first_name", 128).alter();
		tbl.string("last_name", 128).alter();
	});
};

exports.down = async function(knex) {
	await knex.schema.table("Users", tbl => {
		tbl.dropColumn("first_name");
		tbl.dropColumn("last_name");
	});
};
