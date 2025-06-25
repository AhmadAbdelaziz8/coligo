import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Button,
  Paper,
} from "@mui/material";
import {
  Quiz as QuizIcon,
  Announcement as AnnouncementIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  School as SchoolIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { fetchQuizzes } from "../../store/slices/quizSlice";
import { fetchAnnouncements } from "../../store/slices/announcementSlice";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
}) => (
  <Card
    sx={{
      height: "100%",
      background: `linear-gradient(135deg, ${color}10 0%, ${color}20 100%)`,
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
            sx={{ fontWeight: 700, color: color, mb: 1 }}
          >
            {value}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {title}
          </Typography>
          {trend && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <TrendingUpIcon
                sx={{ fontSize: 16, color: "#4caf50", mr: 0.5 }}
              />
              <Typography
                variant="caption"
                sx={{ color: "#4caf50", fontWeight: 500 }}
              >
                {trend}
              </Typography>
            </Box>
          )}
        </Box>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>{icon}</Avatar>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { quizzes, loading: quizzesLoading } = useAppSelector(
    (state) => state.quiz
  );
  const { announcements, loading: announcementsLoading } = useAppSelector(
    (state) => state.announcement
  );

  useEffect(() => {
    dispatch(fetchQuizzes());
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  // Calculate statistics
  const activeQuizzes = quizzes.filter((quiz) => quiz.isActive).length;
  const totalQuizzes = quizzes.length;
  const recentAnnouncements = announcements.slice(0, 5);
  const recentQuizzes = quizzes.slice(0, 5);

  const stats = [
    {
      title: "Total Quizzes",
      value: totalQuizzes,
      icon: <QuizIcon />,
      color: "#2196f3",
      trend: `${activeQuizzes} active`,
    },
    {
      title: "Announcements",
      value: announcements.length,
      icon: <AnnouncementIcon />,
      color: "#ff9800",
      trend: "This month",
    },
    {
      title: "Active Students",
      value: "248",
      icon: <PeopleIcon />,
      color: "#4caf50",
      trend: "+12% this week",
    },
    {
      title: "Course Progress",
      value: "87%",
      icon: <SchoolIcon />,
      color: "#9c27b0",
      trend: "Average completion",
    },
  ];

  return (
    <Box sx={{ p: 3, background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1a365d", mb: 1 }}
        >
          Welcome back, {user?.name}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your courses today.
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Recent Quizzes */}
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1a365d" }}
              >
                Recent Quizzes
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
                onClick={() => navigate("/admin/quizzes/create")}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Create Quiz
              </Button>
            </Box>

            {quizzesLoading ? (
              <Typography>Loading...</Typography>
            ) : recentQuizzes.length > 0 ? (
              <List sx={{ maxHeight: 400, overflow: "auto" }}>
                {recentQuizzes.map((quiz) => (
                  <ListItem
                    key={quiz._id}
                    sx={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 2,
                      mb: 1,
                      "&:hover": { bgcolor: "#f7fafc" },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#2196f3" }}>
                        <QuizIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {quiz.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {quiz.course} • {quiz.topic}
                          </Typography>
                          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                            <Chip
                              label={quiz.isActive ? "Active" : "Inactive"}
                              size="small"
                              color={quiz.isActive ? "success" : "default"}
                            />
                            <Chip
                              label={`${quiz.totalMarks} marks`}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography
                color="text.secondary"
                sx={{ textAlign: "center", py: 4 }}
              >
                No quizzes found. Create your first quiz!
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Recent Announcements */}
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#1a365d" }}
              >
                Recent Announcements
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
                onClick={() => navigate("/admin/announcements/create")}
                sx={{
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Create Post
              </Button>
            </Box>

            {announcementsLoading ? (
              <Typography>Loading...</Typography>
            ) : recentAnnouncements.length > 0 ? (
              <List sx={{ maxHeight: 400, overflow: "auto" }}>
                {recentAnnouncements.map((announcement) => (
                  <ListItem
                    key={announcement._id}
                    sx={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 2,
                      mb: 1,
                      "&:hover": { bgcolor: "#f7fafc" },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#ff9800" }}>
                        <AnnouncementIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {announcement.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {announcement.content}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mt: 1, display: "block" }}
                          >
                            By {announcement.instructor} •{" "}
                            {new Date(
                              announcement.createdAt
                            ).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography
                color="text.secondary"
                sx={{ textAlign: "center", py: 4 }}
              >
                No announcements yet. Create your first announcement!
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          mt: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#1a365d", mb: 3 }}
        >
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<QuizIcon />}
              onClick={() => navigate("/admin/quizzes")}
              sx={{
                py: 2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#2196f3",
                color: "#2196f3",
                "&:hover": { bgcolor: "#2196f310" },
              }}
            >
              Manage Quizzes
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<AnnouncementIcon />}
              onClick={() => navigate("/admin/announcements")}
              sx={{
                py: 2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#ff9800",
                color: "#ff9800",
                "&:hover": { bgcolor: "#ff980010" },
              }}
            >
              Manage Announcements
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<PeopleIcon />}
              sx={{
                py: 2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#4caf50",
                color: "#4caf50",
                "&:hover": { bgcolor: "#4caf5010" },
              }}
            >
              View Students
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<SchoolIcon />}
              sx={{
                py: 2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "#9c27b0",
                color: "#9c27b0",
                "&:hover": { bgcolor: "#9c27b010" },
              }}
            >
              Course Analytics
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AdminDashboardPage;
