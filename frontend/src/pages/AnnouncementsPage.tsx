import React, { useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import Sidebar from "../components/Dashboard/Sidebar";
import TopBar from "../components/Dashboard/TopBar";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAnnouncements } from "../store/slices/announcementSlice";
import { Campaign } from "@mui/icons-material";

const AnnouncementsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { announcements, loading, error } = useAppSelector(
    (state) => state.announcement
  );

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Sidebar />
      <Box sx={{ flex: 1, ml: "280px" }}>
        <TopBar />
        <Box sx={{ p: 3 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, color: "#2d5a87", mb: 3 }}
          >
            Announcements
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Stack spacing={3}>
              {announcements.map((announcement) => (
                <Card
                  sx={{ borderLeft: "5px solid #2d5a87" }}
                  key={announcement._id}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Campaign sx={{ mr: 1.5, color: "#2d5a87" }} />
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold" }}
                      >
                        {announcement.title}
                      </Typography>
                    </Box>
                    <Typography sx={{ mt: 1, mb: 2, color: "text.secondary" }}>
                      {announcement.content}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(announcement.createdAt).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AnnouncementsPage;
