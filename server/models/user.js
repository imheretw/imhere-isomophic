import { bookshelf } from '../db';
import hasher from 'password-hash';

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  serialize: function toFilteredJSON() {
    let favoritedMovieIds;
    // Only keep movie ids
    if (this.related('favoritedMovies')) {
      favoritedMovieIds = this.related('favoritedMovies').toJSON().map((f) => f.id);
    }

    const user = this.pick(['id', 'name', 'gender', 'email', 'avatar_url']);
    user.favoritedMovieIds = favoritedMovieIds;

    return user;
  },

  validatePassword(candidatePassword, cb) {
    if (hasher.verify(candidatePassword, this.get('encrypted_password'))) {
      cb(null, true);
    } else {
      cb('wrong password');
    }
  },
});

export default User;
