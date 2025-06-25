import React from "react";
import { Box, Typography } from "@mui/material";

const GradebookPage: React.FC = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, color: "#2d5a87", mb: 3 }}
      >
        Gradebook
      </Typography>
      <Typography variant="body1" sx={{ color: "#666" }}>
        Gradebook functionality will be implemented here.
      </Typography>
    </Box>
  );
};

export default GradebookPage;
