/* 
-- Source Review -- 
dbdiagram: https://dbdiagram.io/d/5d4b8094ced98361d6dd6837
 UserTypes {
  id int PK
  description VARCHAR(255)
}
  End of Source Review

*/

exports.up = function(knex, Promise) {
    return knex.schema.createTable('UserTypes', function(tbl) {
        // id int PK
        tbl.increments(); 
        
        // description VARCHAR(255)
        tbl
        .string('description', 255)
        .notNullable()
        .unique()

        // created_at
        tbl
        .timestamp('created_at').defaultTo(knex.fn.now())
        .notNullable();

        // updated_at
        tbl.timestamp('updated_at');
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('UserTypes');
};


