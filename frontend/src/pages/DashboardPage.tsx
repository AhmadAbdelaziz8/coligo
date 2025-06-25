import React, { useEffect } from "react";
import { Box } from "@mui/material";
import DashboardHero from "../components/Dashboard/DashboardHero";
import AnnouncementsSection from "../components/Dashboard/AnnouncementsSection";
import WhatsDueSection from "../components/Dashboard/WhatsDueSection";
import { useAppDispatch } from "../hooks/redux";
import { fetchAnnouncements } from "../store/slices/announcementSlice";
import { fetchQuizzes } from "../store/slices/quizSlice";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncements());
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <Box>
      {/* Hero Section */}
      <DashboardHero />

      {/* Main Content Container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: { xs: 3, lg: 4 },
          alignItems: "flex-start",
        }}
      >
        {/* Announcements Section */}
        <AnnouncementsSection />

        {/* What's Due Section */}
        <WhatsDueSection />
      </Box>
    </Box>
  );
};

export default DashboardPage;
