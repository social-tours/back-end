exports.up = async function(knex) {
	await knex.schema.table("Tickets", tbl => {
		tbl.timestamp("created_at").defaultTo(knex.fn.now());
		tbl.timestamp("updated_at");
	});
};

exports.down = async function(knex) {
	await knex.schema.table("Tickets", tbl => {
		tbl.dropColumn("Tickets");
	});
};
