exports.seed = async function(knex) {
  await knex('TicketTypes').insert([
    { id: 1,
      title: "1", // FK ID in 'Tickets' table
      price: 49.99,
      created_at: '2019-08-14',
      updated_at: '2019-08-15'
    } 

  ])
}

exports.seed = async function(knex) {
  await knex('Tickets').insert([
    { id: 1,
      type: 1, // FK ID in 'TicketTypes' table
      user_id: 1, // FK ID in 'Users' table
      event_id: 1
    } 

  ])
}
