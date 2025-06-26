import React from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import AnnouncementCard from "./AnnouncementCard";
import { useAppSelector } from "../../hooks/redux";

const AnnouncementsSection: React.FC = () => {
  const {
    announcements,
    loading: announcementsLoading,
    error: announcementsError,
  } = useAppSelector((state) => state.announcement);

  return (
    <Box
      sx={{
        flex: { xs: "1", lg: "1 1 65%" }, // Takes major space on desktop
        minWidth: 0, // Prevents overflow
        order: { xs: 1, lg: 1 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: { xs: 2, md: 3 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#2d5a87",
            fontSize: { xs: "1.1rem", md: "1.5rem" },
          }}
        >
          Announcements
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#4fc3f7",
            cursor: "pointer",
            fontWeight: 500,
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          component={Link}
          to="/announcements"
        >
          All
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 2, md: 3 },
          alignItems: "stretch",
        }}
      >
        {announcementsLoading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              py: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : announcementsError ? (
          <Box sx={{ width: "100%" }}>
            <Alert severity="error">{announcementsError}</Alert>
          </Box>
        ) : (
          announcements.slice(0, 6).map((announcement) => (
            <Box
              key={announcement._id}
              sx={{
                flex: {
                  xs: "1 1 100%", // 1 card per row on mobile
                  sm: "1 1 calc(50% - 12px)", // 2 cards per row on small screens
                  md: "1 1 calc(33.333% - 16px)", // 3 cards per row on medium+
                },
                minWidth: { xs: "280px", sm: "300px" },
              }}
            >
              <AnnouncementCard announcement={announcement} />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default AnnouncementsSection;
