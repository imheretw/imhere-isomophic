import Bookshelf from 'bookshelf';

import dbConfig from '../knexfile';
import knex from 'knex';

const environment = process.env.NODE_ENV || 'development';
const config = dbConfig[environment];
const connection = knex(config);
const _bookshelf = Bookshelf(connection);

_bookshelf.plugin('pagination');

export const bookshelf = _bookshelf;
