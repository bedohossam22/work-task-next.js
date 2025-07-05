import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  createdAt?: string;
}

interface AnnouncementState {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
}

const initialState: AnnouncementState = {
  announcements: [],
  loading: false,
  error: null
};

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setAnnouncements(state, action: PayloadAction<Announcement[]>) {
      state.announcements = action.payload;
      state.loading = false;
    },
    addAnnouncement(state, action: PayloadAction<Announcement>) {
      state.announcements.push(action.payload);
    },
    deleteAnnouncement(state, action: PayloadAction<string>) {
      state.announcements = state.announcements.filter(a => a._id !== action.payload);
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { 
  startLoading,
  setAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
  setError
} = announcementsSlice.actions;

export default announcementsSlice.reducer;