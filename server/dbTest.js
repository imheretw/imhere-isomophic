import User from './models/user';

const queries = ['actors'];

User
  .forge({ id: 1 })
  .fetch()
  .then(function(user) {
    user.load('favoritedMovies').then(() => {
      console.log(!!user.related('favoritedMovies'));
    });
  });
