/* 
-- Source Review -- 
dbdiagram: https://dbdiagram.io/d/5d4b8094ced98361d6dd6837
Log { 
    id int PK
    path VARCHAR(255)
    user_id int [note: 'FK to Users id']
    exception VARCHAR(MAX)
    created_at TIMESTAMP
  }

End of Source Review
*/

exports.up = function(knex, Promise) {
	return knex.schema.createTable("Log", function(tbl) {
		// id
		tbl.increments();

		// path
		tbl.string("path", 255);

		//user_id
		tbl
			.integer("user_id")
			.references("id")
			.inTable("Users");

		// exception
		tbl.varchar("exception", 255);

		// created_at
		tbl
			.timestamp("created_at")
			.defaultTo(knex.fn.now())
			.notNullable();

		// updated_at
		tbl.timestamp("updated_at");
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("Log");
};
