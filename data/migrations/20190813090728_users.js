
/* 
-- Source Review -- 
dbdiagram: https://dbdiagram.io/d/5d4b8094ced98361d6dd6837
Users {
  id int PK
  first_name VARCHAR(255)
  last_name VARCHAR(255)
  user_name  VARChAR(255)
  gender VARCHAR(255)
  birth_date datetime
  city VARCHAR(255)
  state_province VARCHAR(255)
  country VARCHAR(255)
  email varchar(255)
  password varchar(MAX)
  type int
  created_at TIMESTAMP
}

End of Source Review
*/

exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tbl) {
        // id int PK
        tbl.increments()
        ; 
    
        // first_name
        tbl
        .string('first_name', 128)
        .notNullable()
        ; 
     
        // last_name
        tbl
        .string('last_name', 128)
        .notNullable()
        ; 
     
        // gender
        tbl
        .string('gender', 128)
        ; 
        
        // city
        tbl
        .string('city', 128)
        ; 
        
        // state_province
        tbl
        .string('state_province', 128)
        ; 
        
        // country
        tbl
        .string('country', 128)
        ; 
        
        // email
        tbl
        .string('email', 128)
        .notNullable()
        .unique()
        ; 
        
        // password
        tbl
        .password('password', 128)
        ; 
        
        //type
        tbl
        .integer('type')
        .notNullable()
        ;

        // created_at
        tbl
        .timestamps('created_at').defaultTo(knex.fn.now())
        .notNullable()
        ;
        
        // updated_at
        tbl
        .timestamps('updated_at')
        .notNullable()
        ;
    });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');

};


