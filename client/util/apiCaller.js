import fetch from 'isomorphic-fetch';
import port from '../../server/config/port';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://localhost:${port}/api`) :
  '/api';

export default function callApi(endpoint, method = 'get', body, headers) {
  headers = {
    ...headers,
    'content-type': 'application/json',
  };
  return fetch(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }

    return json;
  });
}
