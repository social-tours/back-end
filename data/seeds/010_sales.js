exports.seed = async function(knex) {
  await knex('Sales').insert([
    { id: 1,
      ticket_id: "1", // FK ID in 'Tickets' table
      sale_amount: 49.99,
      created_at: 'August 14 2019',
      updated_at: 'August 15 2019'
    } 

  ])
}
