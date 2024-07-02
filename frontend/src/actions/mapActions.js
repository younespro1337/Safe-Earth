import { ADD_SUGGESTION } from '../constants/actionTypes';

export const addSuggestion = (suggestion) => {
  console.log('Adding suggestion:', suggestion);
  return {
    type: ADD_SUGGESTION,
    payload: suggestion,  
  };
};
