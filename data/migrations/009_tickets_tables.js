exports.up = async function(knex) {
	await knex.schema.createTable("TicketTypes", tbl => {
		tbl.increments("id");
		tbl.string("title", 255).notNullable();
		tbl.decimal("price");
		tbl.timestamp("created_at").defaultTo(knex.fn.now());
		tbl.timestamp("updated_at");
	});

	await knex.schema.createTable("Tickets", tbl => {
		tbl.increments("id");
		tbl
			.integer("type")
			.references("id")
			.inTable("TicketTypes");
		tbl
			.integer("user_id")
			.references("id")
			.inTable("Users");
		tbl.integer("event_id");
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("Tickets");
	await knex.schema.dropTableIfExists("TicketTypes");
};
