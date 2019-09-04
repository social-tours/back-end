exports.up = async function(knex) {
	await knex.schema.table("Events", tbl => {
		tbl
			.integer("host_id")
			.references("id")
			.inTable("Users");
	});
};

exports.down = async function(knex) {
	await knex.schema.table("Events", tbl => {
		tbl.dropColumn("host_id");
	});
};
