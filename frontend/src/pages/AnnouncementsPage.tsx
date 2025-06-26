import React, { useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Stack,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAnnouncements } from "../store/slices/announcementSlice";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";
import { EmptyFeedback } from "../components/common";

const AnnouncementsPage: React.FC = () => {
  // get the announcements from the store
  const dispatch = useAppDispatch();
  const { announcements, loading, error } = useAppSelector(
    (state) => state.announcement
  );

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  return (
    <Container maxWidth="md">
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1a365d", mb: 1 }}
        >
          📢 Announcements
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay updated with the latest news and information from your
          instructors
        </Typography>
      </Box>

      {/* Content */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      ) : announcements.length === 0 ? (
        <EmptyFeedback type="announcements" />
      ) : (
        <Stack spacing={3}>
          {announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement._id}
              announcement={announcement}
            />
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default AnnouncementsPage;
