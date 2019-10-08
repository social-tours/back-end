exports.up = async function(knex) {
	await knex.schema.table("Subscriptions", tbl => {
		tbl
			.boolean("marketing_opt_in")
			.comment("Default to true")
			.defaultTo(true);
	});
};

exports.down = async function(knex) {
	await knex.schema.table("Subscriptions", tbl => {
		tbl.dropColumn("marketing_opt_in");
	});
};
