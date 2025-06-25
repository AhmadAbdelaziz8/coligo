import React from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import TaskCard from "./TaskCard";
import { useAppSelector } from "../../hooks/redux";

const WhatsDueSection: React.FC = () => {
  const {
    quizzes,
    loading: quizzesLoading,
    error: quizzesError,
  } = useAppSelector((state) => state.quiz);

  return (
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

      {/* Tasks Container */}
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
  );
};

export default WhatsDueSection;
