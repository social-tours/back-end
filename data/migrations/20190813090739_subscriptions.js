
/* 
-- Source Review -- 
dbdiagram: https://dbdiagram.io/d/5d4b8094ced98361d6dd6837
 Subscriptions {
  id int PK
  user_id int [note: 'FK to Users id']
  influencer_id int [note: 'FK to Users id']
  created_at TIMESTAMP
}
  End of Source Review

*/

exports.up = function(knex, Promise) {
    return knex.schema.createTable('subscriptions', function(tbl) {
        // id
        tbl.increments(); 
        
        // user_id int [note: 'FK to Users id']
        tbl
        .integer('user_id')
        .references('id')
        .inTable('Users')
        ;
        
        // influencer_id int [note: 'FK to Users id']
        tbl
        .integer('influencer_id')
        .references('id')
        .inTable('Users')
        ;
 
        // created_at
        tbl
        .timestamps('created_at').defaultTo(knex.fn.now())
        .notNullable()
        ;

        // updated_at
        tbl
        .timestamps('updated_at').defaultTo(knex.fn.now())
        .notNullable()
        ;
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('subscriptions');

};


