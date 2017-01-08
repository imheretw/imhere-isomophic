exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique();
    table.boolean('enabled').default(false);
    table.string('encrypted_password');
    table.timestamps();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};
