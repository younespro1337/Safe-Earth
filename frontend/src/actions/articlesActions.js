import axios from 'axios';
import { UPDATE_ARTICLES } from '../constants/actionTypes';

// Action creators
export const updateArticles = (articles) => {
  return {
    type: UPDATE_ARTICLES,
    payload: articles,
  };
};

// Async action creator
export const fetchArticlesByTopic = (topic) => async (dispatch) => {
  // console.log('topic:', topic);
  localStorage.setItem('lastTopic', topic);
  try {
    const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${topic}&api-key=Z3ACb5oJgIAg9b4qdVw4sHOVqf1ipsMJ`);
    console.log('res:',response)
    dispatch(updateArticles(response.data.response.docs));
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
