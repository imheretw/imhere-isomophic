const knexCleaner = require('knex-cleaner');

exports.seed = (knex) => {
  // Deletes ALL existing entries
  const options = {
    mode: 'truncate', // Valid options 'truncate', 'delete'
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  };

  return knexCleaner.clean(knex, options);
};
