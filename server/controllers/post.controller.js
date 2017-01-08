import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.forge().orderBy('-id').fetchAll()
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = Object.assign({}, req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  Post.forge(newPost).save()
  .then((saved) => {
    res.json({ post: saved });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.forge({ cuid: req.params.cuid }).fetch()
  .then((post) => {
    res.json({ post });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.forge({ cuid: req.params.cuid }).fetch({ require: true })
    .then((post) => {
      return post.destroy()
        .then(() => {
          res.status(200).end();
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
