exports.up = async function(knex) {
	await knex.schema.table("Events", tbl => {
		tbl.boolean("paid_event").defaultTo(false);
	});

	await knex.raw(
		`COMMENT ON COLUMN "Events".paid_event IS 'Paid event flag (default to false)'`
	);
};

exports.down = async function(knex) {
	await knex.schema.table("Events", tbl => {
		tbl.dropColumn("paid_event");
	});
};
