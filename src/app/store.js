import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import profileReducer from '../features/profileSlice';
import shoppingListReducer from '../features/shoppingListSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    shoppingList: shoppingListReducer,
  },
});

export default store;