exports.up = async function(knex) {
	await knex.schema.table("Schedules", tbl => {
		tbl.integer("capacity");
	});
};

exports.down = async function(knex) {
	await knex.schema.table("Schedules", tbl => {
		tbl.dropColumn("capacity");
	});
};
