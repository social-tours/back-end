exports.up = async function(knex) {
	// Drop defunct columns
	if (await knex.schema.hasColumn("Schedules", "start_time")) {
		await knex.schema.table("Schedules", tbl => {
			tbl.dropColumn("start_time");
		});
	}

	if (await knex.schema.hasColumn("Schedules", "end_time")) {
		await knex.schema.table("Schedules", tbl => {
			tbl.dropColumn("end_time");
		});
	}

	// Replace with new date_time columns
	await knex.schema.table("Schedules", tbl => {
		tbl.timestamp("start_date_time");
		tbl.timestamp("end_date_time");
	});
};

exports.down = async function(knex) {
	await knex.schema.table("Schedules", tbl => {
		tbl.dropColumn("start_date_time");
		tbl.dropColumn("end_date_time");
	});
};
