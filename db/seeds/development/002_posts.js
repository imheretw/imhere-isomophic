import posts from '../data/posts';

exports.seed = (knex, Promise) => {
  const promises = posts.map((user) => {
    return knex('posts').insert(user);
  });

  return Promise.all(promises);
};
