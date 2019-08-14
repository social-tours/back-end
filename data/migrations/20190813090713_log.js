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
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        ; 
        
        //user_id
        tbl
        .integer('user_id')
        .unique()
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        ;

        // exception
        tbl
        .varchar('exception', 255)
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        ;

        // created_at
        tbl.timestamps('created_at',true,true)
        .notNullable()
        .unique()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        ;

    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('log');

};


