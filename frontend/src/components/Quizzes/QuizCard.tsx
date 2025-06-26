import React from "react";
import { Box, Typography, Button, Paper, Chip } from "@mui/material";
import { HelpOutline as QuizIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { Quiz } from "../../types/quiz";

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const { _id, title, course, topic, dueDate } = quiz;
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quizzes/${_id}`);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #e0e0e0",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          transform: "translateY(-3px)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <QuizIcon sx={{ color: "#2d5a87", mr: 1.5 }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#2d5a87", fontSize: "1.1rem" }}
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, ml: 4.5 }}>
        <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>
          Topic: {topic}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Typography variant="body1" sx={{ color: "#666" }}>
            Course:
          </Typography>
          <Chip label={course} size="small" variant="outlined" />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
          <Typography variant="body1" sx={{ color: "#666" }}>
            Due:
          </Typography>
          <Chip
            label={new Date(dueDate).toLocaleDateString()}
            size="small"
            variant="outlined"
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        fullWidth
        onClick={handleStartQuiz}
        sx={{
          mt: "auto",
          backgroundColor: "#4fc3f7",
          "&:hover": { backgroundColor: "#29b6f6" },
          py: 1.5,
          fontSize: "0.9rem",
          fontWeight: 600,
        }}
      >
        Start Quiz
      </Button>
    </Paper>
  );
};

export default QuizCard;
