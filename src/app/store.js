import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/authSlice'; // Check this reducer
import profileReducer from '../features/profileSlice'; // Check this reducer
import shoppingListReducer from '../features/shoppingListSlice'; // Check this reducer

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, {
  auth: authReducer, // Ensure this is a valid reducer function
  profile: profileReducer, // Ensure this is a valid reducer function
  shoppingList: shoppingListReducer, // Ensure this is a valid reducer function
});

export const store = configureStore({
  reducer: persistedReducer, // This should be a valid combined reducer
});

export const persistor = persistStore(store);

export default store;