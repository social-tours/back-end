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
    return knex.schema.createTable('userTypes', function(tbl) {
        // id int PK
        tbl.increments(); 
        
        // description VARCHAR(255)
        tbl
        .string('description', 255)
        .notNullable()
        .unique() // will there be more than 1 description per userType?
        ; 
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('userTypes');

};


