import { SIGN_UP, SIGN_IN, SIGN_OUT, AUTH_ERROR } from './AuthActions';

const initialState = {
  currentUser: null,
  error: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        currentUser: {
          name: action.name,
          favorited_movie_ids: [],
        },
      };
    case SIGN_IN:
      return {
        ...state,
        currentUser: action.user,
        error: null,
      };
    case SIGN_OUT:
      return {
        ...state,
        currentUser: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getError = (state) => state.auth.error;

export default AuthReducer;
