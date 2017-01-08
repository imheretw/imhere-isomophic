import bcrypt from 'bcrypt';

import { bookshelf } from '../db';
import config from '../config/appConfig';

const User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  serialize: function toFilteredJSON() {
    const user = this.pick(['id', 'name', 'gender', 'email']);

    return user;
  },

  validatePassword(candidatePassword, cb) {
    const cryptedPassword = bcrypt.hashSync(candidatePassword, config.auth.bcryptSalt);
    if (cryptedPassword === this.get('encrypted_password')) {
      cb(null, true);
    } else {
      cb('password is invalid');
    }
  },
});

export default User;
