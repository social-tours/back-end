exports.seed = async function(knex) {
  await knex('interests').insert([
    { id: 1,
      name: 'Netflix Binging',
    }
  ])
}

exports.seed = async function(knex) {
  await knex('UserInterests').insert([
    { id: 1,
      user_id: 2,
      interest_id: 1
    }
  ])
}
