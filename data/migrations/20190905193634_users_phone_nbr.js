exports.up = async function(knex) {
	await knex.schema.table("Users", tbl => {
		tbl.string("phone_nbr", 20);
	});
};

exports.down = async function(knex) {
	await knex.schema.table("Users", tbl => {
		tbl.dropColumn("phone_nbr");
	});
};
