import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Quiz {
  _id: string;
  title: string;
  questions: {
    text: string;
    options: string[];
    correctAnswer: number;
  }[];
}

interface QuizState {
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  loading: false,
  error: null
};

export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    fetchQuizzesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchQuizzesSuccess(state, action: PayloadAction<Quiz[]>) {
      state.quizzes = action.payload;
      state.loading = false;
    },
    fetchQuizzesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addQuiz(state, action: PayloadAction<Quiz>) {
      state.quizzes.push(action.payload);
    },
    deleteQuiz(state, action: PayloadAction<string>) {
      state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload);
    }
  }
});

// Export actions
export const { 
  fetchQuizzesStart, 
  fetchQuizzesSuccess, 
  fetchQuizzesFailure,
  addQuiz,
  deleteQuiz
} = quizzesSlice.actions;

// Export the reducer
export default quizzesSlice.reducer;