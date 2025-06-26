import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { quizAPI } from "../../services/api";
import type { Quiz } from "../../types/quiz";

export type CreateQuizData = Omit<
  Quiz,
  "_id" | "createdAt" | "updatedAt" | "createdBy" | "isActive"
>;
export type UpdateQuizData = Partial<CreateQuizData>;

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
export const fetchQuizzes = createAsyncThunk<Quiz[]>(
  "quiz/fetchQuizzes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await quizAPI.getQuizzes();
      return response.data; // Assuming API returns { data: Quiz[] }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch quizzes";
      return rejectWithValue(message);
    }
  }
);

export const fetchQuizById = createAsyncThunk<Quiz, string>(
  "quiz/fetchQuizById",
  async (quizId: string, { rejectWithValue }) => {
    try {
      const response = await quizAPI.getQuizById(quizId);
      return response.data; // Assuming API returns { data: Quiz }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch quiz";
      return rejectWithValue(message);
    }
  }
);

export const createQuiz = createAsyncThunk<Quiz, CreateQuizData>(
  "quiz/createQuiz",
  async (quizData, { rejectWithValue }) => {
    try {
      const response = await quizAPI.createQuiz(quizData);
      return response.data; // Assuming API returns { data: Quiz }
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create quiz";
      return rejectWithValue(message);
    }
  }
);

export const updateQuiz = createAsyncThunk<
  Quiz,
  { id: string; data: UpdateQuizData }
>("quiz/updateQuiz", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await quizAPI.updateQuiz(id, data);
    return response.data; // Assuming API returns { data: Quiz }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update quiz";
    return rejectWithValue(message);
  }
});

export const deleteQuiz = createAsyncThunk<string, string>(
  "quiz/deleteQuiz",
  async (quizId: string, { rejectWithValue }) => {
    try {
      await quizAPI.deleteQuiz(quizId);
      return quizId;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to delete quiz";
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
      .addCase(fetchQuizzes.fulfilled, (state, action: PayloadAction<Quiz[]>) => {
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
      .addCase(
        fetchQuizById.fulfilled,
        (state, action: PayloadAction<Quiz>) => {
          state.loading = false;
          state.currentQuiz = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create quiz cases
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
        state.loading = false;
        state.quizzes.unshift(action.payload);
        state.error = null;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update quiz cases
      .addCase(updateQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuiz.fulfilled, (state, action: PayloadAction<Quiz>) => {
        state.loading = false;
        const index = state.quizzes.findIndex(
          (q) => q._id === action.payload._id
        );
        if (index !== -1) {
          state.quizzes[index] = action.payload;
        }
        state.currentQuiz = action.payload;
        state.error = null;
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete quiz cases
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteQuiz.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.quizzes = state.quizzes.filter(
            (q) => q._id !== action.payload
          );
          state.error = null;
        }
      )
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentQuiz } = quizSlice.actions;
export default quizSlice.reducer;
