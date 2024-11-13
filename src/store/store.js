// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice'
import activeReducer from '../slices/activeSlice'
import authReducer from '../slices/authSlice'

const store = configureStore({
  reducer: {
    todos: todoReducer,
    active:activeReducer,
    auth:authReducer
  },
});

export default store;
