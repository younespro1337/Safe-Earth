// articlesReducer.js
import { UPDATE_ARTICLES } from '../constants/actionTypes';

const initialState = {
  articles: [],
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};

export default articlesReducer;
