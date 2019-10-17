// Create EventTypes and Event Tables
exports.up = async function(knex) {
	await knex.schema.createTable("EventTypes", tbl => {
		tbl.increments("id");
		tbl.string("description", 255).notNullable();
		tbl.timestamp("created_at").defaultTo(knex.fn.now());
		tbl.timestamp("updated_at");
	});

	await knex.schema.createTable("Events", tbl => {
		tbl.increments("id");
		tbl
			.integer("type")
			.references("id")
			.inTable("EventTypes");
		tbl.string("title", 128).notNullable();
		tbl.string("description", 1000);
		tbl.string("event_image");
		tbl.timestamp("created_at").defaultTo(knex.fn.now());
		tbl.timestamp("updated_at");
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("Events");
	await knex.schema.dropTableIfExists("EventTypes");
};
