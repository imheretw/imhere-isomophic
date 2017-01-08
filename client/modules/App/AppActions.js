// Export Constants
export const SET_MESSAGE = 'SET_MESSAGE';
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';

// Export Actions

// AuthReducer will handle it
export function setMessage(message) {
  return {
    type: SET_MESSAGE,
    message,
  };
}

export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}
