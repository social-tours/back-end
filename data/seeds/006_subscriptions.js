exports.seed = async function(knex) {
  await knex('Subscriptions').insert([
    { id: 1,
      user_id: 1, // FK ID in 'Users' table
      influencer_id: 1, // FK ID in 'Users' table
      created_at: 'August 14 2019',
      updated_at: 'August 15 2019'
    } 

  ])
}
