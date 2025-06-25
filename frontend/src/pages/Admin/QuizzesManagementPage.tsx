import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  Fab,
  Tooltip,
  Menu,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  MoreVert as MoreVertIcon,
  School as SchoolIcon,
  Timer as TimerIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import {
  fetchQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../../store/slices/quizSlice";

// Define Quiz interface locally to avoid import issues
interface Quiz {
  _id: string;
  title: string;
  topic: string;
  course: string;
  questions: Array<{
    questionText: string;
    options: string[];
    correctAnswer: number;
    points: number;
  }>;
  duration: number;
  totalMarks: number;
  isActive: boolean;
  dueDate: string;
  instructions?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface QuizFormData {
  title: string;
  course: string;
  topic: string;
  dueDate: string;
  duration: number;
  totalMarks: number;
  instructions: string;
  questions: Array<{
    questionText: string;
    options: string[];
    correctAnswer: number;
    points: number;
  }>;
}

const QuizzesManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { quizzes, loading, error } = useAppSelector((state) => state.quiz);

  // Ensure quizzes is always an array
  const quizzesArray = Array.isArray(quizzes) ? quizzes : [];

  const [openDialog, setOpenDialog] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const [formData, setFormData] = useState<QuizFormData>({
    title: "",
    course: "",
    topic: "",
    dueDate: "",
    duration: 30,
    totalMarks: 100,
    instructions: "",
    questions: [
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        points: 10,
      },
    ],
  });

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleOpenDialog = (quiz?: Quiz) => {
    if (quiz) {
      setEditingQuiz(quiz);
      setFormData({
        title: quiz.title,
        course: quiz.course,
        topic: quiz.topic,
        dueDate: quiz.dueDate.split("T")[0], // Format for date input
        duration: quiz.duration,
        totalMarks: quiz.totalMarks,
        instructions: quiz.instructions || "",
        questions: quiz.questions || [
          {
            questionText: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
            points: 10,
          },
        ],
      });
    } else {
      setEditingQuiz(null);
      setFormData({
        title: "",
        course: "",
        topic: "",
        dueDate: "",
        duration: 30,
        totalMarks: 100,
        instructions: "",
        questions: [
          {
            questionText: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
            points: 10,
          },
        ],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingQuiz(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingQuiz) {
        await dispatch(
          updateQuiz({ id: editingQuiz._id, data: formData })
        ).unwrap();
        setSnackbar({
          open: true,
          message: "Quiz updated successfully!",
          severity: "success",
        });
      } else {
        await dispatch(createQuiz(formData)).unwrap();
        setSnackbar({
          open: true,
          message: "Quiz created successfully!",
          severity: "success",
        });
      }
      // Refetch quizzes to ensure the list is updated
      dispatch(fetchQuizzes());
      handleCloseDialog();
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || "Operation failed!",
        severity: "error",
      });
    }
  };

  const handleDelete = async (quiz: Quiz) => {
    if (window.confirm(`Are you sure you want to delete "${quiz.title}"?`)) {
      try {
        await dispatch(deleteQuiz(quiz._id)).unwrap();
        // Refetch quizzes to ensure the list is updated
        dispatch(fetchQuizzes());
        setSnackbar({
          open: true,
          message: "Quiz deleted successfully!",
          severity: "success",
        });
      } catch (error: any) {
        setSnackbar({
          open: true,
          message: error.message || "Delete failed!",
          severity: "error",
        });
      }
    }
    setAnchorEl(null);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    quiz: Quiz
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedQuiz(quiz);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedQuiz(null);
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
          points: 10,
        },
      ],
    });
  };

  const removeQuestion = (index: number) => {
    if (formData.questions.length > 1) {
      setFormData({
        ...formData,
        questions: formData.questions.filter((_, i) => i !== index),
      });
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const updateQuestionOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: [...updatedQuestions[questionIndex].options],
    };
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading quizzes...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#1a365d", mb: 1 }}
          >
            Quiz Management 📝
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create, edit, and manage your quizzes
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
          }}
        >
          Create New Quiz
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background:
                "linear-gradient(135deg, #667eea20 0%, #764ba230 100%)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#667eea" }}
                  >
                    {quizzesArray.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Quizzes
                  </Typography>
                </Box>
                <SchoolIcon sx={{ fontSize: 40, color: "#667eea" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background:
                "linear-gradient(135deg, #4caf5020 0%, #8bc34a30 100%)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#4caf50" }}
                  >
                    {quizzesArray.filter((q) => q.isActive).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Quizzes
                  </Typography>
                </Box>
                <AssignmentIcon sx={{ fontSize: 40, color: "#4caf50" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background:
                "linear-gradient(135deg, #ff980020 0%, #ffc10730 100%)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: "#ff9800" }}
                  >
                    {Math.round(
                      quizzesArray.reduce(
                        (acc, quiz) => acc + quiz.duration,
                        0
                      ) / quizzesArray.length
                    ) || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Duration (min)
                  </Typography>
                </Box>
                <TimerIcon sx={{ fontSize: 40, color: "#ff9800" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quizzes Table */}
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Box sx={{ p: 3, borderBottom: "1px solid #e2e8f0" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#1a365d" }}>
            All Quizzes ({quizzesArray.length})
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#f8fafc" }}>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Quiz Details
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Course & Topic
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Duration
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Marks
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Status
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Due Date
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzesArray.map((quiz) => (
                <TableRow
                  key={quiz._id}
                  sx={{ "&:hover": { bgcolor: "#f7fafc" } }}
                >
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {quiz.questions?.length || 0} questions
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{quiz.course}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {quiz.topic}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${quiz.duration} min`}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {quiz.totalMarks} pts
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={quiz.isActive ? "Active" : "Inactive"}
                      size="small"
                      color={quiz.isActive ? "success" : "default"}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(quiz.dueDate).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handleMenuClick(e, quiz)}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {quizzesArray.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ textAlign: "center", py: 4 }}>
                    <Typography color="text.secondary">
                      No quizzes found. Create your first quiz!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
        onClick={() => handleOpenDialog()}
      >
        <AddIcon />
      </Fab>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            // Handle view
            handleMenuClose();
          }}
        >
          <ViewIcon sx={{ mr: 1, fontSize: 20 }} />
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedQuiz) handleOpenDialog(selectedQuiz);
            handleMenuClose();
          }}
        >
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          Edit Quiz
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedQuiz) handleDelete(selectedQuiz);
          }}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
          Delete Quiz
        </MenuItem>
      </Menu>

      {/* Create/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingQuiz ? "Edit Quiz" : "Create New Quiz"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Quiz Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Course"
                value={formData.course}
                onChange={(e) =>
                  setFormData({ ...formData, course: e.target.value })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Topic"
                value={formData.topic}
                onChange={(e) =>
                  setFormData({ ...formData, topic: e.target.value })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                type="number"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: parseInt(e.target.value),
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Total Marks"
                type="number"
                value={formData.totalMarks}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalMarks: parseInt(e.target.value),
                  })
                }
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Instructions"
                multiline
                rows={3}
                value={formData.instructions}
                onChange={(e) =>
                  setFormData({ ...formData, instructions: e.target.value })
                }
                variant="outlined"
              />
            </Grid>

            {/* Questions Section */}
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Questions ({formData.questions.length})
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={addQuestion}
                  size="small"
                >
                  Add Question
                </Button>
              </Box>

              {formData.questions.map((question, index) => (
                <Paper
                  key={index}
                  sx={{ p: 3, mb: 2, border: "1px solid #e2e8f0" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Question {index + 1}
                    </Typography>
                    {formData.questions.length > 1 && (
                      <IconButton
                        onClick={() => removeQuestion(index)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>

                  <TextField
                    fullWidth
                    label="Question Text"
                    value={question.questionText}
                    onChange={(e) =>
                      updateQuestion(index, "questionText", e.target.value)
                    }
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />

                  <Grid container spacing={2}>
                    {question.options.map((option, optionIndex) => (
                      <Grid item xs={12} md={6} key={optionIndex}>
                        <TextField
                          fullWidth
                          label={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) =>
                            updateQuestionOption(
                              index,
                              optionIndex,
                              e.target.value
                            )
                          }
                          variant="outlined"
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        select
                        label="Correct Answer"
                        value={question.correctAnswer}
                        onChange={(e) =>
                          updateQuestion(
                            index,
                            "correctAnswer",
                            parseInt(e.target.value)
                          )
                        }
                        variant="outlined"
                        SelectProps={{ native: true }}
                      >
                        {question.options.map((_, optionIndex) => (
                          <option key={optionIndex} value={optionIndex}>
                            Option {optionIndex + 1}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Points"
                        type="number"
                        value={question.points}
                        onChange={(e) =>
                          updateQuestion(
                            index,
                            "points",
                            parseInt(e.target.value)
                          )
                        }
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {editingQuiz ? "Update Quiz" : "Create Quiz"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default QuizzesManagementPage;
