import React from "react";
import { Box, Typography } from "@mui/material";
import Sidebar from "../components/Dashboard/Sidebar";
import TopBar from "../components/Dashboard/TopBar";

const SchedulePage: React.FC = () => {
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
            Schedule
          </Typography>
          <Typography variant="body1" sx={{ color: "#666" }}>
            Schedule functionality will be implemented here.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SchedulePage;
