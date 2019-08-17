
exports.seed = async function(knex) {
  // Insert seed entries
  await knex('UserTypes').insert([
    { id: 1, name: 'Influencer' },
    { id: 2, name: 'Follower'} 
  ])
};
