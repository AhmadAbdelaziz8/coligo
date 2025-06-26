import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Container,
  Stack,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import {
  Timer,
  NavigateNext,
  NavigateBefore,
  CheckCircle,
  Warning,
  Quiz as QuizIcon,
  ArrowBack,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchQuizById } from "../store/slices/quizSlice";

interface QuizAnswer {
  questionId: string;
  selectedOption: string;
}

const QuizTakingPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { currentQuiz, loading, error } = useAppSelector((state) => state.quiz);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizId) {
      dispatch(fetchQuizById(quizId));
    }
  }, [dispatch, quizId]);

  useEffect(() => {
    if (currentQuiz && !quizStarted) {
      setTimeLeft((currentQuiz.timeLimit || currentQuiz.duration || 30) * 60); // Convert minutes to seconds
      setQuizStarted(true);
    }
  }, [currentQuiz, quizStarted]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && quizStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizStarted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (questionId: string, selectedOption: string) => {
    setAnswers((prev) => {
      const existingIndex = prev.findIndex((a) => a.questionId === questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { questionId, selectedOption };
        return updated;
      }
      return [...prev, { questionId, selectedOption }];
    });
  };

  const getSelectedAnswer = (questionId: string) => {
    return (
      answers.find((a) => a.questionId === questionId)?.selectedOption || ""
    );
  };

  const handleNextQuestion = () => {
    if (currentQuiz && currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmitQuiz = useCallback(() => {
    console.log("Quiz submitted with answers:", answers);
    navigate("/dashboard/quizzes");
  }, [answers, navigate]);

  const getProgressPercentage = () => {
    if (!currentQuiz) return 0;
    return ((currentQuestion + 1) / currentQuiz.questions.length) * 100;
  };

  const getAnsweredQuestionsCount = () => {
    if (!currentQuiz) return 0;
    return currentQuiz.questions.filter((q) =>
      answers.some((a) => a.questionId === q._id)
    ).length;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <Typography>Loading quiz...</Typography>
      </Container>
    );
  }

  if (error || !currentQuiz) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <Typography color="error">
          Error loading quiz: {error || "Quiz not found"}
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/quizzes")}
          sx={{ mt: 2 }}
        >
          Back to Quizzes
        </Button>
      </Container>
    );
  }

  const currentQ = currentQuiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === currentQuiz.questions.length - 1;
  const answeredCount = getAnsweredQuestionsCount();
  const totalQuestions = currentQuiz.questions.length;

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 2, md: 3 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          mb: { xs: 2, md: 3 },
          borderRadius: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 1 }}
            >
              <IconButton
                onClick={() => navigate("/dashboard/quizzes")}
                sx={{ color: "white", p: 0.5 }}
                size="small"
              >
                <ArrowBack />
              </IconButton>
              <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600}>
                {currentQuiz.title}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{ opacity: 0.9, fontSize: { xs: "0.85rem", sm: "0.875rem" } }}
            >
              Question {currentQuestion + 1} of {totalQuestions}
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "row", sm: "column" }}
            alignItems={{ xs: "center", sm: "flex-end" }}
            spacing={{ xs: 2, sm: 1 }}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Timer fontSize="small" />
              <Typography
                variant="h6"
                fontWeight={600}
                color={timeLeft < 300 ? "#ffeb3b" : "white"}
                sx={{ fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
              >
                {formatTime(timeLeft)}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <CheckCircle fontSize="small" />
              <Typography variant="body2">
                {answeredCount}/{totalQuestions} answered
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Progress Bar */}
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={getProgressPercentage()}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.2)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                bgcolor: "#4caf50",
              },
            }}
          />
        </Box>
      </Paper>

      {/* Question Card */}
      <Card
        elevation={2}
        sx={{
          mb: { xs: 2, md: 3 },
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            fontWeight={600}
            sx={{
              mb: 3,
              color: "primary.main",
              lineHeight: 1.4,
            }}
          >
            {currentQ.question}
          </Typography>

          <RadioGroup
            value={getSelectedAnswer(currentQ._id)}
            onChange={(e) => handleAnswerChange(currentQ._id, e.target.value)}
          >
            <Stack spacing={1.5}>
              {currentQ.options.map((option, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    border: "2px solid",
                    borderColor:
                      getSelectedAnswer(currentQ._id) === option
                        ? "primary.main"
                        : "divider",
                    borderRadius: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "primary.light",
                      bgcolor: "primary.50",
                    },
                    bgcolor:
                      getSelectedAnswer(currentQ._id) === option
                        ? "primary.50"
                        : "transparent",
                  }}
                >
                  <FormControlLabel
                    value={option}
                    control={<Radio sx={{ color: "primary.main" }} />}
                    label={
                      <Typography
                        sx={{
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                          py: 0.5,
                        }}
                      >
                        {option}
                      </Typography>
                    }
                    sx={{
                      m: 0,
                      p: { xs: 2, sm: 2.5 },
                      width: "100%",
                      "& .MuiFormControlLabel-label": {
                        width: "100%",
                      },
                    }}
                  />
                </Paper>
              ))}
            </Stack>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Button
          variant="outlined"
          startIcon={<NavigateBefore />}
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          sx={{
            minWidth: { xs: 100, sm: 120 },
            py: { xs: 1, sm: 1.5 },
          }}
        >
          Previous
        </Button>

        <Stack direction="row" spacing={1}>
          {currentQuiz.questions.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentQuestion(index)}
              sx={{
                width: { xs: 8, sm: 12 },
                height: { xs: 8, sm: 12 },
                borderRadius: "50%",
                bgcolor:
                  index === currentQuestion
                    ? "primary.main"
                    : answers.some(
                        (a) => a.questionId === currentQuiz.questions[index]._id
                      )
                    ? "success.main"
                    : "divider",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          ))}
        </Stack>

        {isLastQuestion ? (
          <Button
            variant="contained"
            color="success"
            onClick={() => setShowSubmitDialog(true)}
            sx={{
              minWidth: { xs: 100, sm: 120 },
              py: { xs: 1, sm: 1.5 },
            }}
          >
            Submit Quiz
          </Button>
        ) : (
          <Button
            variant="contained"
            endIcon={<NavigateNext />}
            onClick={handleNextQuestion}
            sx={{
              minWidth: { xs: 100, sm: 120 },
              py: { xs: 1, sm: 1.5 },
            }}
          >
            Next
          </Button>
        )}
      </Stack>

      {/* Submit Confirmation Dialog */}
      <Dialog
        open={showSubmitDialog}
        onClose={() => setShowSubmitDialog(false)}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Warning color="warning" />
            <Typography variant="h6">Submit Quiz?</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Are you sure you want to submit your quiz? You have answered{" "}
            <strong>{answeredCount}</strong> out of{" "}
            <strong>{totalQuestions}</strong> questions.
          </Typography>
          {answeredCount < totalQuestions && (
            <Typography color="warning.main" variant="body2">
              You still have {totalQuestions - answeredCount} unanswered
              questions.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSubmitDialog(false)}>
            Continue Quiz
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmitQuiz}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuizTakingPage;
