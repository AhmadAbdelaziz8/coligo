import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Paper,
} from "@mui/material";
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  Add as AddIcon,
  Quiz as QuizIcon,
  Announcement as AnnouncementIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchQuizzes } from "../../store/slices/quizSlice";
import { fetchAnnouncements } from "../../store/slices/announcementSlice";
import type { Quiz } from "../../types/quiz";
import type { Announcement } from "../../types/announcement";

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

  const quizzesArray: Quiz[] = Array.isArray(quizzes) ? quizzes : [];
  const announcementsArray: Announcement[] = Array.isArray(announcements) ? announcements : [];
  const activeQuizzes = quizzesArray.filter((quiz) => quiz.isActive).length;
  const totalQuizzes = quizzesArray.length;
  const recentAnnouncements = announcementsArray.slice(0, 5);
  const recentQuizzes = quizzesArray.slice(0, 5);

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
      value: announcementsArray.length,
      icon: <AnnouncementIcon />,
      color: "#ff9800",
      trend: "This month",
    },
    {
      title: "Active Students",
      value: "248",
      icon: <AssignmentIcon />,
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

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ flex: 2, minWidth: 0 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              height: "100%",
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
                onClick={() => navigate("/admin/quizzes")}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Manage Quizzes
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
                      secondary={`Due: ${new Date(
                        quiz.dueDate
                      ).toLocaleDateString()}`}
                    />
                    <Chip
                      label={quiz.isActive ? "Active" : "Inactive"}
                      color={quiz.isActive ? "success" : "default"}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No recent quizzes.</Typography>
            )}
          </Paper>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              height: "100%",
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
                onClick={() => navigate("/admin/announcements")}
                sx={{
                  background:
                    "linear-gradient(135deg, #ff9800 0%, #ff5722 100%)",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Manage Announcements
              </Button>
            </Box>
            {announcementsLoading ? (
              <Typography>Loading...</Typography>
            ) : recentAnnouncements.length > 0 ? (
              <List>
                {recentAnnouncements.map((announcement) => (
                  <ListItem key={announcement._id}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#ff9800" }}>
                        <AnnouncementIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={announcement.title}
                      secondary={announcement.content}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No recent announcements.</Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;
