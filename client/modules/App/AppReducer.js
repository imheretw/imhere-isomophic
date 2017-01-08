// Import Actions
import { SET_MESSAGE, TOGGLE_ADD_POST } from './AppActions';

// Initial State
const initialState = {
  message: null,
  showAddPost: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        ...state,
        showAddPost: !state.showAddPost,
      };

    case SET_MESSAGE:
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};

/* Selectors */
export const getShowAddPost = state => state.app.showAddPost;

// Export Reducer
export default AppReducer;
