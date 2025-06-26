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
  Card,
  CardContent,
  Fab,
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
  dueDate?: string;
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
  const { quizzes, loading } = useAppSelector((state) => state.quiz);

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
        dueDate: (quiz.dueDate ? quiz.dueDate.split("T")[0] : "") as string, // Format for date input
        duration: quiz.duration,
        totalMarks: quiz.totalMarks,
        instructions: quiz.instructions || "",
        questions: quiz.questions,
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
    } catch (error: unknown) {
      setSnackbar({
        open: true,
        message: (error as Error).message || "Operation failed!",
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
      } catch (error: unknown) {
        setSnackbar({
          open: true,
          message: (error as Error).message || "Delete failed!",
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
    if (updatedQuestions[index]) {
      (updatedQuestions[index] as any)[field] = value;
      setFormData({ ...formData, questions: updatedQuestions });
    }
  };

  const updateQuestionOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...formData.questions];
    if (updatedQuestions[questionIndex]) {
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        options: [...updatedQuestions[questionIndex].options],
      };
      updatedQuestions[questionIndex].options[optionIndex] = value;
    }
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
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1a365d",
            mb: 2,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
          }}
        >
          Quiz Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Create, edit, and manage quizzes for your courses.
        </Typography>

        {/* Stats Cards */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 2, sm: 3 },
            mb: 4,
          }}
        >
          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(33.333% - 16px)",
              },
              minWidth: 0,
            }}
          >
            <Card
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                      sx={{ fontWeight: 700, color: "white", mb: 1 }}
                    >
                      {quizzesArray.length}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}
                    >
                      Total Quizzes
                    </Typography>
                  </Box>
                  <SchoolIcon
                    sx={{ color: "white", fontSize: { xs: 32, sm: 40 } }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 12px)",
                md: "1 1 calc(33.333% - 16px)",
              },
              minWidth: 0,
            }}
          >
            <Card
              sx={{
                background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
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
                      sx={{ fontWeight: 700, color: "white", mb: 1 }}
                    >
                      {quizzesArray.filter((quiz) => quiz.isActive).length}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}
                    >
                      Active Quizzes
                    </Typography>
                  </Box>
                  <TimerIcon
                    sx={{ color: "white", fontSize: { xs: 32, sm: 40 } }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 100%",
                md: "1 1 calc(33.333% - 16px)",
              },
              minWidth: 0,
            }}
          >
            <Card
              sx={{
                background: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)",
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
                      sx={{ fontWeight: 700, color: "white", mb: 1 }}
                    >
                      {quizzesArray.reduce(
                        (total, quiz) => total + (quiz.totalMarks || 0),
                        0
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}
                    >
                      Total Points
                    </Typography>
                  </Box>
                  <AssignmentIcon
                    sx={{ color: "white", fontSize: { xs: 32, sm: 40 } }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Paper
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Toolbar */}
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1a365d",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            All Quizzes ({quizzesArray.length})
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              py: { xs: 1.5, sm: 1 },
            }}
          >
            Create New Quiz
          </Button>
        </Box>

        {/* Mobile Card View for xs screens, Table for larger screens */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          {loading ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography>Loading quizzes...</Typography>
            </Box>
          ) : quizzesArray.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">
                No quizzes found. Create your first quiz!
              </Typography>
            </Box>
          ) : (
            <Box sx={{ p: 2 }}>
              {quizzesArray.map((quiz) => (
                <Card
                  key={quiz._id}
                  sx={{ mb: 2, border: "1px solid #e2e8f0" }}
                >
                  <CardContent sx={{ pb: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 1, fontSize: "1rem" }}
                        >
                          {quiz.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Course: {quiz.course}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          Topic: {quiz.topic}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                        >
                          Due: {new Date(quiz.dueDate).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Chip
                            label={quiz.isActive ? "Active" : "Inactive"}
                            color={quiz.isActive ? "success" : "default"}
                            size="small"
                          />
                          <Chip
                            label={`${quiz.duration} min`}
                            variant="outlined"
                            size="small"
                          />
                          <Chip
                            label={`${quiz.totalMarks} pts`}
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                      </Box>
                      <IconButton
                        onClick={(e) => handleMenuClick(e, quiz)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>

        {/* Desktop Table View */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                    Quiz Title
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                    Course
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                    Topic
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                    Due Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                    Duration
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                    Total Marks
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a365d" }}>
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "#1a365d",
                      textAlign: "center",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} sx={{ textAlign: "center", py: 4 }}>
                      <Typography>Loading quizzes...</Typography>
                    </TableCell>
                  </TableRow>
                ) : quizzesArray.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} sx={{ textAlign: "center", py: 4 }}>
                      <Typography color="text.secondary">
                        No quizzes found. Create your first quiz!
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  quizzesArray.map((quiz) => (
                    <TableRow
                      key={quiz._id}
                      sx={{ "&:hover": { backgroundColor: "#f8fafc" } }}
                    >
                      <TableCell>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {quiz.title}
                        </Typography>
                      </TableCell>
                      <TableCell>{quiz.course}</TableCell>
                      <TableCell>{quiz.topic}</TableCell>
                      <TableCell>
                        {new Date(quiz.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{quiz.duration} min</TableCell>
                      <TableCell>{quiz.totalMarks}</TableCell>
                      <TableCell>
                        <Chip
                          label={quiz.isActive ? "Active" : "Inactive"}
                          color={quiz.isActive ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        <IconButton
                          onClick={(e) => handleMenuClick(e, quiz)}
                          size="small"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>

      {/* Floating Action Button for mobile */}
      <Fab
        color="primary"
        aria-label="add quiz"
        onClick={() => handleOpenDialog()}
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          display: { xs: "flex", sm: "none" },
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Quiz Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  variant="outlined"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Course"
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({ ...formData, course: e.target.value })
                  }
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  label="Topic"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  variant="outlined"
                />
              </Box>
              <Box sx={{ flex: 1 }}>
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
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ flex: 1 }}>
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
              </Box>
              <Box sx={{ flex: 1 }}>
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
              </Box>
            </Box>
            <Box>
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
            </Box>

            {/* Questions Section */}
            <Box>
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

                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}
                  >
                    {question.options.map((option, optionIndex) => (
                      <Box
                        key={optionIndex}
                        sx={{
                          flex: { xs: "1 1 100%", md: "1 1 calc(50% - 8px)" },
                          minWidth: 0,
                        }}
                      >
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
                      </Box>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
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
                    </Box>
                    <Box sx={{ flex: 1 }}>
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
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Box>
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
