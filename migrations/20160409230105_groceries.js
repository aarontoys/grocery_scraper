
exports.up = function(knex, Promise) {
  return knex.schema.createTable('groceries', function (table) {
    table.increments();
    table.string('img');
    table.string('name');
    table.string('size');
    table.string('upc').unique();
    table.string('pageurl');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('groceries');
};
