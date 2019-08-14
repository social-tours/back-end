/* 
-- Source Review -- 
dbdiagram: https://dbdiagram.io/d/5d4b8094ced98361d6dd6837
 UserInterests {
  id int PK
  user_id int
  interest_id int
}
  End of Source Review

*/

exports.up = function(knex, Promise) {
    return knex.schema.createTable('userInterests', function(tbl) {
        // id int PK
        tbl.increments(); 
        
        // user_id int
        tbl
        .integer('user_id')
        .unique()
        .notNullable()
        ;

        // interest_id int - db doesnt state this is a FK but the table its linked to doesnt have this FK either
        tbl
        .integer('interest_id')
        .references('id')
        .inTable('Usertypes')
        ; 
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('userInterests');

};


