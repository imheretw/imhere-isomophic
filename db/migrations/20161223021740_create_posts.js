exports.up = (knex) => {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.string('slug').notNullable();
    table.string('cuid').notNullable();
    table.timestamps();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('posts');
};
