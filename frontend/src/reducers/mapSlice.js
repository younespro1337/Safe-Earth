// articlesReducer.js
import { ADD_SUGGESTION } from '../constants/actionTypes';

const initialState = {
  addSuggestion: null, // Remove articles field
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUGGESTION:
      return {
        ...state,
        addSuggestion: action.payload,
      };
    default:
      return state;
  }
};

export default articlesReducer;
