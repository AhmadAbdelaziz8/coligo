import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
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
      background: `linear-gradient(135deg, ${color}20 0%, ${color}40 100%)`,
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: `0 10px 20px ${color}30`,
      },
    }}
  >
    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
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
  const announcementsArray: Announcement[] = Array.isArray(announcements)
    ? announcements
    : [];
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
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 3, md: 4 },
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#1a365d",
            mb: 1,
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
          }}
        >
          Welcome back, {user?.name}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your courses today.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: { xs: 3, md: 4 },
        }}
      >
        {stats.map((stat, index) => (
          <StatCard {...stat} key={index} />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: { xs: 3, sm: 3 },
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Box sx={{ flex: { lg: 2 }, minWidth: 0 }}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                mb: 3,
                flexDirection: { xs: "column", sm: "row" },
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
                  width: { xs: "100%", sm: "auto" },
                  fontSize: { xs: "0.875rem", sm: "0.8125rem" },
                  py: { xs: 1.5, sm: 1 },
                }}
              >
                Manage Announcements
              </Button>
            </Box>
            {announcementsLoading ? (
              <Typography>Loading...</Typography>
            ) : recentAnnouncements.length > 0 ? (
              <List sx={{ maxHeight: { xs: 300, md: 400 }, overflow: "auto" }}>
                {recentAnnouncements.map((announcement) => (
                  <ListItem
                    key={announcement._id}
                    sx={{
                      px: { xs: 1, sm: 2 },
                      py: { xs: 1.5, sm: 2 },
                      border: "1px solid #e2e8f0",
                      borderRadius: 2,
                      mb: 1,
                      "&:hover": { bgcolor: "#f7fafc" },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: "#ff9800",
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                        }}
                      >
                        <AnnouncementIcon
                          sx={{ fontSize: { xs: 16, sm: 20 } }}
                        />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            fontSize: { xs: "0.875rem", sm: "1rem" },
                            lineHeight: 1.3,
                          }}
                        >
                          {announcement.title}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: { xs: 2, sm: 3 },
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: { xs: "0.75rem", sm: "0.875rem" },
                            mt: 0.5,
                          }}
                        >
                          {announcement.content}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography sx={{ textAlign: "center", color: "#64748b", py: 4 }}>
                No recent announcements.
              </Typography>
            )}
          </Paper>
        </Box>
        <Box sx={{ flex: { lg: 1 }, minWidth: 0 }}>
          <Paper
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
                mb: 3,
                flexDirection: { xs: "column", sm: "row" },
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
                  width: { xs: "100%", sm: "auto" },
                  fontSize: { xs: "0.875rem", sm: "0.8125rem" },
                  py: { xs: 1.5, sm: 1 },
                }}
              >
                Manage Quizzes
              </Button>
            </Box>

            {quizzesLoading ? (
              <Typography>Loading...</Typography>
            ) : recentQuizzes.length > 0 ? (
              <List sx={{ maxHeight: { xs: 300, md: 400 }, overflow: "auto" }}>
                {recentQuizzes.map((quiz) => (
                  <ListItem
                    key={quiz._id}
                    sx={{
                      px: { xs: 1, sm: 2 },
                      py: { xs: 1.5, sm: 2 },
                      border: "1px solid #e2e8f0",
                      borderRadius: 2,
                      mb: 1,
                      "&:hover": { bgcolor: "#f7fafc" },
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: { xs: "flex-start", sm: "center" },
                      gap: { xs: 1, sm: 0 },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor: "#2196f3",
                            width: { xs: 32, sm: 40 },
                            height: { xs: 32, sm: 40 },
                          }}
                        >
                          <QuizIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: 600,
                              fontSize: { xs: "0.875rem", sm: "1rem" },
                              lineHeight: 1.3,
                            }}
                          >
                            {quiz.title}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                          >
                            Due: {new Date(quiz.dueDate).toLocaleDateString()}
                          </Typography>
                        }
                      />
                    </Box>
                    <Chip
                      label={quiz.isActive ? "Active" : "Inactive"}
                      color={quiz.isActive ? "success" : "default"}
                      size="small"
                      sx={{
                        alignSelf: { xs: "flex-end", sm: "center" },
                        mt: { xs: 1, sm: 0 },
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography sx={{ textAlign: "center", color: "#64748b", py: 4 }}>
                No recent quizzes.
              </Typography>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;
