import React from "react";
import { Box } from "@mui/material";
import ExamBanner from "./ExamBanner";

const DashboardHero: React.FC = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <ExamBanner />
    </Box>
  );
};

export default DashboardHero;
