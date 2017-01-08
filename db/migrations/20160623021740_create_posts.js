exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table){
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.string('slug').notNullable();
    table.string('cuid').notNullable();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
