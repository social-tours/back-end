/* 
-- Source Review -- 
dbdiagram: https://dbdiagram.io/d/5d4b8094ced98361d6dd6837
 Interests {
  id int PK
  name VARCHAR(255)
}

  End of Source Review

*/

/*
exports.up = function(knex, Promise) {
    return knex.schema.createTable('interests', function(tbl) {
        // id int PK
        tbl.increments(); 
        
        // name VARCHAR(255)
        tbl
        .string('name', 255)
        .notNullable()
        .unique() // will there be more than 1 description per userType?
        ; 
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('interests');

};


 */
