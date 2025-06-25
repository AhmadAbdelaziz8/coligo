import React from "react";
import { Box, Typography } from "@mui/material";

const CoursesPage: React.FC = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, color: "#2d5a87", mb: 3 }}
      >
        Courses
      </Typography>
      <Typography variant="body1" sx={{ color: "#666" }}>
        Courses functionality will be implemented here.
      </Typography>
    </Box>
  );
};

export default CoursesPage;
