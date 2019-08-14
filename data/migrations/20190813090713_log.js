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
    return knex.schema.createTable('log', function(tbl) {
        // id
        tbl.increments(); 
    
        // path
        tbl
        .string('path', 255)
        .notNullable()
        .unique() // will there be more than 1 path per log?
        ; 
        
        //user_id
        tbl
        .integer('user_id')
        .unique()
        .notNullable()
        ;

        // exception
        tbl
        .varchar('exception', 255)
        .notNullable()
        ;

        // created_at
        tbl
        .string('created_at', 255)
        .notNullable()
        .timestamps('created_at').defaultTo(knex.fn.now())
        .unique()
        ;

    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('log');

};


