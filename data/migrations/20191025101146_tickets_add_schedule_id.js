exports.up = async function(knex) {
	await knex.schema.table("Tickets", tbl => {
		tbl
			.integer("event_schedule_id")
			.references("id")
			.inTable("Schedules");
	});

	await knex.raw(`COMMENT ON COLUMN "Tickets".event_id IS '[DEPRECATED]'`);
};

exports.down = async function(knex) {
	await knex.schema.table("Tickets", tbl => {
		tbl.dropColumn("event_schedule_id");
	});
};
