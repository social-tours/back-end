exports.up = async function(knex) {
	await knex.schema.table("Events", tbl => {
		tbl.decimal("price").defaultTo(0.0);
	});

	await knex.raw(`COMMENT ON COLUMN "Events".price IS 'Default to 0.0'`);
};

exports.down = async function(knex) {
	await knex.schema.table("Events", tbl => {
		tbl.dropColumn("price");
	});
};
