exports.seed = async function(knex) {
  await knex('Schedules').insert([
    { id: 1,
      event_id: 1, // FK ID in 'Events' table
      sequence: 1,
      title: 'Bifunkal',
      description: 'Blues band from Chicago',
      start_time: '05:00 PM',
      end_time: '08:00 PM',
      created_at: '2019-08-14',
      updated_at: '2019-08-15'
    } 
  ])
}
