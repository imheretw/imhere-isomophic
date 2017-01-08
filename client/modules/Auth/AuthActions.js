import { push } from 'react-router-redux';
import callApi from '../../util/apiCaller';
import cookie from 'js-cookie';
// Export Constants
export const SIGN_UP = 'SIGN_UP';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const AUTH_ERROR = 'AUTH_ERROR';

// Export Actions

export function signOut() {
  return {
    type: SIGN_OUT,
  };
}

export function signIn(user) {
  return {
    type: SIGN_IN,
    user,
  };
}

export function signInError(error) {
  return {
    type: AUTH_ERROR,
    error,
  };
}

export function fetchAuthenticated() {
  return (dispatch, getState) => {
    const token = getState().auth.id_token;
    return callApi('auth/user', 'get', undefined, { Authorization: `Bearer ${token}` }).then(res => {
      dispatch(signIn(res.user));
    });
  };
}

export function requestSignOut() {
  return (dispatch) => {
    return callApi('auth/logout').then(() => {
      cookie.remove('id_token');
      dispatch(signOut());
    });
  };
}

export function requestSignUp(form) {
  return (dispatch) => {
    return callApi('auth/register', 'post', form).then((res) => {
      cookie.set('id_token', res.token);
      dispatch(signIn(res.user));
      dispatch(push('/'));
    }).catch((res) => {
      dispatch(signInError(res.error));
    });
  };
}

export function requestSignIn(credentials) {
  return (dispatch) => {
    return callApi('auth/login', 'post', credentials).then((res) => {
      cookie.set('id_token', res.token);
      dispatch(signIn(res.user));
      dispatch(push('/'));
    }).catch((res) => {
      dispatch(signInError(res.error));
    });
  };
}
