import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
export const fetchQuizzes = createAsyncThunk<
  Quiz[],
  void,
  { rejectValue: string }
>("quiz/fetchQuizzes", async (_, { rejectWithValue }) => {
  try {
    const response = await quizAPI.getQuizzes();
    return Array.isArray(response) ? response : response.data || [];
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch quizzes";
    return rejectWithValue(message);
  }
});

export const fetchQuizById = createAsyncThunk<
  Quiz,
  string,
  { rejectValue: string }
>("quiz/fetchQuizById", async (quizId: string, { rejectWithValue }) => {
  try {
    const response = await quizAPI.getQuizById(quizId);
    return response.data || response;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch quiz";
    return rejectWithValue(message);
  }
});

export const createQuiz = createAsyncThunk<
  Quiz,
  CreateQuizData,
  { rejectValue: string }
>("quiz/createQuiz", async (quizData, { rejectWithValue }) => {
  try {
    const response = await quizAPI.createQuiz(quizData);
    return response.data || response;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to create quiz";
    return rejectWithValue(message);
  }
});

export const updateQuiz = createAsyncThunk<
  Quiz,
  { id: string; data: UpdateQuizData },
  { rejectValue: string }
>("quiz/updateQuiz", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await quizAPI.updateQuiz(id, data);
    return response.data || response;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update quiz";
    return rejectWithValue(message);
  }
});

export const deleteQuiz = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("quiz/deleteQuiz", async (quizId: string, { rejectWithValue }) => {
  try {
    await quizAPI.deleteQuiz(quizId);
    return quizId;
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to delete quiz";
    return rejectWithValue(message);
  }
});

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
        state.error = action.payload || "Failed to fetch quizzes";
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
        state.error = action.payload || "Failed to fetch quiz";
      })
      // Create quiz cases
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes.unshift(action.payload);
        state.error = null;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create quiz";
      })
      // Update quiz cases
      .addCase(updateQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
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
        state.error = action.payload || "Failed to update quiz";
      })
      // Delete quiz cases
      .addCase(deleteQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete quiz";
      });
  },
});

export const { clearError, clearCurrentQuiz } = quizSlice.actions;
export default quizSlice.reducer;
