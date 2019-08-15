const cleaner = require('knex-cleaner')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  await cleaner.clean(knex, {
    node: `delete`,
    ignoreTables: [
      'knex_migrations',
      'knex_migrations_lock'
    ]
  })
};
