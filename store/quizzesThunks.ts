import { AppDispatch } from './store';
import { 
  startLoading,
  setQuizzes,
  setError 
} from './quizzesSlice';

export const fetchQuizzes = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(startLoading());
    const response = await fetch('/api/quizzes');
    const data = await response.json();
    dispatch(setQuizzes(data));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

// Add similar thunks for other operations