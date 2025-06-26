import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  Assignment,
  PlayArrow,
  School,
  AccessTime,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchQuizzes } from "../store/slices/quizSlice";
import { EmptyFeedback } from "../components/common";

const QuizzesListPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { quizzes, loading, error } = useAppSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleStartQuiz = (quizId: string) => {
    navigate(`/dashboard/quiz/${quizId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "error";
      default:
        return "primary";
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, md: 4 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QuizIcon fontSize={isMobile ? "medium" : "large"} />
          </Box>
          <Box>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight={700}
              color="primary"
            >
              Available Quizzes
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
            >
              Test your knowledge and track your progress
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Loading State */}
      {loading && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography>Loading quizzes...</Typography>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="error">Error loading quizzes: {error}</Typography>
        </Box>
      )}

      {/* Quizzes Grid */}
      {!loading && !error && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          {quizzes.map((quiz) => (
            <Card
              key={quiz._id}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                },
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                {/* Quiz Header */}
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                  sx={{ mb: 2 }}
                >
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1.5,
                      bgcolor: "primary.50",
                      color: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 40,
                      height: 40,
                    }}
                  >
                    <Assignment />
                  </Box>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      sx={{
                        mb: 0.5,
                        fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        lineHeight: 1.3,
                      }}
                      noWrap
                    >
                      {quiz.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.8rem", sm: "0.875rem" },
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {quiz.description}
                    </Typography>
                  </Box>
                </Stack>

                {/* Quiz Details */}
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2 }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <AccessTime fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {quiz.timeLimit || quiz.duration || 0} minutes
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <School fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {quiz.questions?.length || 0} questions
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip
                      label={quiz.difficulty}
                      color={getDifficultyColor(quiz.difficulty)}
                      size="small"
                      sx={{ fontSize: "0.75rem" }}
                    />
                    {quiz.subject && (
                      <Chip
                        label={quiz.subject}
                        variant="outlined"
                        size="small"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    )}
                  </Stack>
                </Stack>

                {/* Start Button */}
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<PlayArrow />}
                  onClick={() => handleStartQuiz(quiz._id)}
                  sx={{
                    py: { xs: 1, sm: 1.5 },
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                    },
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    fontWeight: 600,
                  }}
                >
                  Start Quiz
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {/* Empty State */}
      {!loading && !error && quizzes.length === 0 && (
        <EmptyFeedback type="exams" />
      )}
    </Container>
  );
};

export default QuizzesListPage;
