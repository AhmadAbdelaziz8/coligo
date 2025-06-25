import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
} from "@mui/material";
import Sidebar from "../components/Dashboard/Sidebar";
import TopBar from "../components/Dashboard/TopBar";
import ExamBanner from "../components/Dashboard/ExamBanner";
import AnnouncementCard from "../components/Dashboard/AnnouncementCard";
import TaskCard from "../components/Dashboard/TaskCard";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchAnnouncements } from "../store/slices/announcementSlice";
import { fetchQuizzes } from "../store/slices/quizSlice";
import { Link } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {
    announcements,
    loading: announcementsLoading,
    error: announcementsError,
  } = useAppSelector((state) => state.announcement);
  const {
    quizzes,
    loading: quizzesLoading,
    error: quizzesError,
  } = useAppSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchAnnouncements());
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          ml: { xs: 0, lg: "280px" },
          minWidth: 0, // Prevents overflow
        }}
      >
        {/* Top Bar */}
        <TopBar handleDrawerToggle={handleDrawerToggle} isMobile={isMobile} />

        {/* Content Area */}
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          {/* Exam Banner */}
          <Box sx={{ mb: 3 }}>
            <ExamBanner />
          </Box>

          {/* Main Content Container - Flexbox Layout */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: { xs: 3, lg: 4 },
              alignItems: "flex-start",
            }}
          >
            {/* Left Section - Announcements (Major Space) */}
            <Box
              sx={{
                flex: { xs: "1", lg: "1 1 65%" }, // Takes major space on desktop
                minWidth: 0, // Prevents overflow
                order: { xs: 1, lg: 1 },
              }}
            >
              {/* Announcements Header */}
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
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
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

              {/* Announcements Container - Flex Row with Wrap */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.5, md: 2 },
                }}
              >
                {announcementsLoading ? (
                  <CircularProgress />
                ) : announcementsError ? (
                  <Alert severity="error">{announcementsError}</Alert>
                ) : (
                  announcements
                    .slice(0, 4)
                    .map((announcement) => (
                      <AnnouncementCard
                        key={announcement._id}
                        announcement={announcement}
                      />
                    ))
                )}
              </Box>
            </Box>

            {/* Right Section - What's Due (Side Column) */}
            <Box
              sx={{
                flex: { xs: "1", lg: "0 0 300px" }, // Fixed width on desktop
                width: { xs: "100%", lg: "300px" },
                order: { xs: 2, lg: 2 },
                mt: { xs: 3, lg: 0 },
              }}
            >
              {/* What's Due Header */}
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
                    fontSize: { xs: "1.25rem", md: "1.5rem" },
                  }}
                >
                  What's due
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
                >
                  All
                </Typography>
              </Box>

              {/* Tasks Container - Flex Column */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1.5, md: 2 },
                }}
              >
                {quizzesLoading ? (
                  <CircularProgress />
                ) : quizzesError ? (
                  <Alert severity="error">{quizzesError}</Alert>
                ) : (
                  quizzes
                    .slice(0, 2)
                    .map((quiz) => <TaskCard key={quiz._id} quiz={quiz} />)
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
