exports.up = async function(knex) {
	await knex.schema.table("Users", tbl => {
		tbl.integer("type").alter();
	});
};

exports.down = async function(knex) {
	await knex.schema.table("Users", tbl => {
		tbl.dropColumn("type");
	});
};
