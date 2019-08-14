
exports.up = async function(knex) {
  await knex.schema.createTable('Schedules', tbl => {
    tbl.increments('id')
    tbl.integer('event_id')
      .references('id')
      .inTable('Events')
    tbl.integer('sequence')
    tbl.string('title', 255)
    tbl.string('description')
    tbl.timestamp('start_time')
    tbl.timestamp('end_time')
    tbl.timestamp('created_at').defaultTo(knex.fn.now())
    tbl.timestamp('updated_at')
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('Schedules')
};
