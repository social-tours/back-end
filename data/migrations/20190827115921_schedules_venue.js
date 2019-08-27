exports.up = async function(knex) {
	await knex.schema.table("Schedules", tbl => {
		tbl.string("location");
		tbl.string("address_1");
		tbl.string("address_2");
		tbl.string("city");
		tbl.string("postal_code");
		tbl.string("country");
	});
};

exports.down = async function(knex) {
	await knex.schema.table("Schedules", tbl => {
		tbl.dropColumn("location");
		tbl.dropColumn("address_1");
		tbl.dropColumn("address_2");
		tbl.dropColumn("city");
		tbl.dropColumn("postal_code");
		tbl.dropColumn("country");
	});
};
