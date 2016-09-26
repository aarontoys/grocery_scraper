
exports.up = function(knex, Promise) {
  return knex.schema.createTable('rejected_urls', function (table) {
    table.increments();
    table.string('url').unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rejected_urls');
};

