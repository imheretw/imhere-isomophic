import { bookshelf } from '../db';

const Post = bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
});

export default Post;
