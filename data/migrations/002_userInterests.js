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
    return knex.schema.createTable('UserInterests', function(tbl) {
        // id int PK
        tbl.increments(); 
        
        // user_id int PK from Users
        tbl
        .integer('user_id')
        .references('id')
        .inTable('Users')
        ;

        // interest_id int - db doesnt state this is a FK but the table its linked to doesnt have this FK either
        tbl
        .integer('interest_id')
        .references('id')
        .inTable('Interests')
        
        // created_at
        tbl
        .timestamp('created_at').defaultTo(knex.fn.now())
        .notNullable()
        ;

        // updated_at
        tbl
        .timestamp('updated_at')
        .notNullable()
        ; 
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('UserInterests');

};


/* 
-- Source Review -- 
dbdiagram: https://dbdiagram.io/d/5d4b8094ced98361d6dd6837
 Interests {
  id int PK
  name VARCHAR(255)
}

  End of Source Review

*/


exports.up = function(knex, Promise) {
  return knex.schema.createTable('Interests', function(tbl) {
      // id int PK
      tbl.increments(); 
      
      // name VARCHAR(255)
      tbl
      .string('name', 255)
      .notNullable()
      .unique()
      
      // created_at
      tbl
      .timestamp('created_at').defaultTo(knex.fn.now())
      .notNullable()
      ;

      // updated_at
      tbl
      .timestamp('updated_at')
      .notNullable()
      ; 
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Interests');

};
