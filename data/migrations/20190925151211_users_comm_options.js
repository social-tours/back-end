exports.up = async function(knex) {
	await knex.schema.table("Users", tbl => {
		tbl
			.integer("comm_preference")
			.comment("1-Email, 2- SMS, 3-Both")
			.defaultTo(3);
	});
};

exports.down = async function(knex) {
	await knex.schema.table("Users", tbl => {
		tbl.dropColumn("comm_preference");
	});
};
