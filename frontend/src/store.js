// store.js
import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './reducers/mapSlice';
import articlesReducer from './reducers/articlesReducer';
const store = configureStore({
  reducer: {
    articles: articlesReducer,
    map: mapReducer,
  },
});

export default store;
