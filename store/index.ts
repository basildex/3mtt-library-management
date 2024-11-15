import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './slices/bookSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    books: bookReducer,
    user: userReducer, // Store user data (Librarian or Member)
  },
});

// Define the types of state for later use
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
