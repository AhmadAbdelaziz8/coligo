import React from "react";
import { Box, Typography, Button, Paper, Chip } from "@mui/material";
import { Quiz as QuizIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import type { Quiz } from "../../types/quiz";

interface TaskCardProps {
  quiz: Quiz;
}

const TaskCard: React.FC<TaskCardProps> = ({ quiz }) => {
  const { _id, title, course, topic, dueDate } = quiz;
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quizzes/${_id}`);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid #f0f0f0",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <QuizIcon sx={{ color: "#2d5a87", mr: 1.5 }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#2d5a87",
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
        >
          {title}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{
          color: "#666",
          mb: 2,
        }}
      >
        Topic: {topic}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography variant="caption" sx={{ color: "#999" }}>
          Course:
        </Typography>
        <Chip label={course} size="small" />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
        <Typography variant="caption" sx={{ color: "#999" }}>
          Due:
        </Typography>
        <Chip label={new Date(dueDate).toLocaleDateString()} size="small" />
      </Box>
      <Button
        variant="contained"
        fullWidth
        onClick={handleStartQuiz}
        sx={{
          backgroundColor: "#4fc3f7",
          "&:hover": { backgroundColor: "#29b6f6" },
          py: 1.5,
          fontSize: { xs: "0.8rem", sm: "0.9rem" },
        }}
      >
        Start Quiz
      </Button>
    </Paper>
  );
};

export default TaskCard;
