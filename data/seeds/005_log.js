
exports.seed = async function(knex) {
  // Insert seed entries
  await knex('Log').insert([
    {
      id: 1,
      path: '',
      user_id: 1
    },
    {
      id: 2,
      path: '',
      user_id: 2
    },
    {
      id: 3,
      path: '',
      user_id: 3
    },
  ])
};
