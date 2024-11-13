// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice'
import activeReducer from '../slices/activeSlice'

const store = configureStore({
  reducer: {
    todos: todoReducer,
    active:activeReducer
  },
});

export default store;
