exports.seed = async function(knex) {
  await knex('Schedules').insert([
    { id: 1,
      event_id: 1, // FK ID in 'Events' table
      sequence: 1,
      title: 'Bifunkal',
      description: 'Blues band from Chicago',
      start_time: '05:00 PM',
      end_time: 'October 15 2019',
      created_at: 'August 14 2019',
      updated_at: 'August 15 2019'
    } 

  ])
}
