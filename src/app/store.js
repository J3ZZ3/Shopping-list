import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/authSlice';
import profileReducer from '../features/profileSlice';
import shoppingListReducer from '../features/shoppingListSlice';

// Create root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  shoppingList: shoppingListReducer,
});

// Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

export const persistor = persistStore(store);

export default store;