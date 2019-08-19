exports.seed = async function(knex) {
  await knex('Subscriptions').insert([
    { id: 1,
      user_id: 1, // FK ID in 'Users' table
      influencer_id: 1, // FK ID in 'Users' table
      created_at: '2019-08-14',
      updated_at: '2019-08-15'
    } 

  ])
}
