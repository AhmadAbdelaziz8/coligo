import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { quizAPI } from "../../services/api";

interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
  questions: unknown[];
  timeLimit: number;
  totalPoints: number;
  isActive: boolean;
  dueDate: string;
}

interface QuizState {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  currentQuiz: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchQuizzes = createAsyncThunk(
  "quiz/fetchQuizzes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await quizAPI.getQuizzes();
      return response;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch quizzes";
      return rejectWithValue(message);
    }
  }
);

export const fetchQuizById = createAsyncThunk(
  "quiz/fetchQuizById",
  async (quizId: string, { rejectWithValue }) => {
    try {
      const response = await quizAPI.getQuizById(quizId);
      return response;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch quiz";
      return rejectWithValue(message);
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentQuiz: (state) => {
      state.currentQuiz = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch quizzes cases
      .addCase(fetchQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
        state.error = null;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch quiz by ID cases
      .addCase(fetchQuizById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuiz = action.payload;
        state.error = null;
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentQuiz } = quizSlice.actions;
export default quizSlice.reducer;
