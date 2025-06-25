import React from "react";
import { Box, Typography, Button, Paper, Chip } from "@mui/material";
import { Quiz as QuizIcon, Assignment } from "@mui/icons-material";

interface Quiz {
  _id: string;
  title: string;
  description: string;
  course: string;
  questions: unknown[];
  timeLimit: number;
  totalPoints: number;
  isActive: boolean;
  dueDate: string;
}

interface TaskCardProps {
  quiz: Quiz;
}

const TaskCard: React.FC<TaskCardProps> = ({ quiz }) => {
  const { title, course, description, dueDate } = quiz;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid #f0f0f0",
        mb: 2,
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "#4fc3f7",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <QuizIcon />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#2d5a87",
              fontSize: "18px",
              mb: 0.5,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#666",
              mb: 1,
            }}
          >
            Course: {course}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#666",
              mb: 2,
            }}
          >
            Topic: {description}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
              }}
            >
              Due to:
            </Typography>
            <Chip
              label={new Date(dueDate).toLocaleDateString()}
              size="small"
              sx={{
                backgroundColor: "#f5f5f5",
                color: "#666",
                fontSize: "12px",
              }}
            />
            <Chip
              label={new Date(dueDate).toLocaleTimeString()}
              size="small"
              sx={{
                backgroundColor: "#f5f5f5",
                color: "#666",
                fontSize: "12px",
              }}
            />
          </Box>

          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "#4fc3f7",
              color: "#4fc3f7",
              borderRadius: 2,
              py: 1,
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                borderColor: "#4fc3f7",
                backgroundColor: "#4fc3f710",
              },
            }}
          >
            Start Quiz
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default TaskCard;
