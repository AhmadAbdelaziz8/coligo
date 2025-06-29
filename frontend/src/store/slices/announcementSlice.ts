import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { announcementAPI } from "../../services/api";

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  instructor: string;
  instructorAvatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  instructor: string;
  instructorAvatar?: string;
}

interface AnnouncementState {
  announcements: Announcement[];
  currentAnnouncement: Announcement | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementState = {
  announcements: [],
  currentAnnouncement: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchAnnouncements = createAsyncThunk<
  Announcement[],
  void,
  { rejectValue: string }
>("announcement/fetchAnnouncements", async (_, { rejectWithValue }) => {
  try {
    const response = await announcementAPI.getAnnouncements();
    return Array.isArray(response) ? response : response.data || [];
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch announcements";
    return rejectWithValue(message);
  }
});

export const fetchAnnouncementById = createAsyncThunk<
  Announcement,
  string,
  { rejectValue: string }
>(
  "announcement/fetchAnnouncementById",
  async (announcementId: string, { rejectWithValue }) => {
    try {
      const response = await announcementAPI.getAnnouncementById(
        announcementId
      );
      return response.data || response;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch announcement";
      return rejectWithValue(message);
    }
  }
);

export const createAnnouncement = createAsyncThunk<
  Announcement,
  CreateAnnouncementRequest,
  { rejectValue: string }
>(
  "announcement/createAnnouncement",
  async (announcementData: CreateAnnouncementRequest, { rejectWithValue }) => {
    try {
      const response = await announcementAPI.createAnnouncement(
        announcementData
      );
      return response.data || response;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create announcement";
      return rejectWithValue(message);
    }
  }
);

export const updateAnnouncement = createAsyncThunk<
  Announcement,
  { id: string; data: Partial<CreateAnnouncementRequest> },
  { rejectValue: string }
>(
  "announcement/updateAnnouncement",
  async (
    { id, data }: { id: string; data: Partial<CreateAnnouncementRequest> },
    { rejectWithValue }
  ) => {
    try {
      const response = await announcementAPI.updateAnnouncement(id, data);
      return response.data || response;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to update announcement";
      return rejectWithValue(message);
    }
  }
);

export const deleteAnnouncement = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>(
  "announcement/deleteAnnouncement",
  async (announcementId: string, { rejectWithValue }) => {
    try {
      await announcementAPI.deleteAnnouncement(announcementId);
      return announcementId;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete announcement";
      return rejectWithValue(message);
    }
  }
);

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentAnnouncement: (state) => {
      state.currentAnnouncement = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload;
        state.error = null;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch announcements";
      })
      .addCase(fetchAnnouncementById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncementById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAnnouncement = action.payload;
        state.error = null;
      })
      .addCase(fetchAnnouncementById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch announcement";
      })
      .addCase(createAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements.unshift(action.payload);
        state.error = null;
      })
      .addCase(createAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create announcement";
      })
      .addCase(updateAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.announcements.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index !== -1) {
          state.announcements[index] = action.payload;
        }
        state.currentAnnouncement = action.payload;
        state.error = null;
      })
      .addCase(updateAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update announcement";
      })
      .addCase(deleteAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = state.announcements.filter(
          (a) => a._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete announcement";
      });
  },
});

export const { clearError, clearCurrentAnnouncement } =
  announcementSlice.actions;
export default announcementSlice.reducer;
