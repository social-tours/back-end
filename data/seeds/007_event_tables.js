exports.seed = async function(knex) {
  await knex('EventTypes').insert([
    { id: 1,
      description: "Concert",
      created_at: '2019-08-14',
      updated_at: '2019-08-15'
    } 

  ])
}

exports.seed = async function(knex) {
  await knex('Events').insert([
    { id: 1,
      type: 1, // FK ID in 'EventTypes' table
      title: "See Bifunkal Orchestra", 
      description: "Orchestrated Blues and Funk", 
      event_image: 'Bifunkal Image Here',
      capacity: 5000,
      created_at: '2019-08-14',
      updated_at: '2019-08-15'
    } 

  ])
}