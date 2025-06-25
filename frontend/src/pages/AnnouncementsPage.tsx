import React, { useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import { Campaign as CampaignIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAnnouncements } from "../store/slices/announcementSlice";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";

const AnnouncementsPage: React.FC = () => {
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
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            bgcolor: "#f8fafc",
            border: "1px solid #e2e8f0",
          }}
        >
          <CampaignIcon sx={{ fontSize: 48, color: "#cbd5e1", mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No announcements yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Check back later for updates from your instructors
          </Typography>
        </Paper>
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
