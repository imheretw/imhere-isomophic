import users from '../data/users';

exports.seed = (knex, Promise) => {
  const promises = users.map((user) => {
    return knex('users').insert(user);
  });

  return Promise.all(promises);
};
