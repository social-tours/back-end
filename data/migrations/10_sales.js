exports.up = async function(knex) {
	await knex.schema.createTable("Sales", tbl => {
		tbl.increments("id");
		tbl
			.integer("ticket_id")
			.references("id")
			.inTable("Tickets");
		tbl.decimal("sale_amount").defaultTo(0.0);
		tbl.timestamp("created_at").defaultTo(knex.fn.now());
		tbl.timestamp("updated_at");
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("Sales");
};
