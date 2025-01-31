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
  localStorage.setItem('lastTopic', topic);
  try {
    const apiKey = process.env.REACT_APP_NYT_API_KEY;
    const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${topic}&api-key=${apiKey}`);
    console.log('res:', response);
    dispatch(updateArticles(response.data.response.docs));
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
