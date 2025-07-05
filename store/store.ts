import { configureStore } from '@reduxjs/toolkit';
import quizzesReducer from './quizzesSlice';

export const store = configureStore({
  reducer: {
    quizzes: quizzesReducer // Use the exported reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;