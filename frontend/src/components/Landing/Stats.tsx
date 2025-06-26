import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  LinearProgress,
  Avatar,
  Chip,
} from "@mui/material";
import {
  TrendingUp,
  People,
  School,
  Quiz,
  Assessment,
  MenuBook,
  EmojiEvents,
  Schedule,
  Assignment,
  Class,
} from "@mui/icons-material";

const Stats: React.FC = () => {
  const academicMetrics = [
    { label: "Quiz Performance", value: 87, color: "#4CAF50" },
    { label: "Assignment Submission", value: 94, color: "#2196F3" },
    { label: "Course Completion Rate", value: 82, color: "#FF9800" },
    { label: "Student Engagement", value: 91, color: "#9C27B0" },
  ];

  const departmentPerformance = [
    {
      icon: TrendingUp,
      title: "Academic Growth",
      value: "+23%",
      subtitle: "This semester",
    },
    {
      icon: People,
      title: "Active Students",
      value: "1,247",
      subtitle: "Enrolled",
    },
    {
      icon: School,
      title: "Courses Available",
      value: "48",
      subtitle: "This term",
    },
    {
      icon: Quiz,
      title: "Quizzes Completed",
      value: "12.5K",
      subtitle: "This month",
    },
  ];

  const coursePerformance = [
    {
      course: "Computer Science",
      percentage: 92,
      grade: "A",
      enrollments: 245,
    },
    { course: "Mathematics", percentage: 88, grade: "A-", enrollments: 189 },
    { course: "Physics", percentage: 85, grade: "B+", enrollments: 156 },
    { course: "Chemistry", percentage: 81, grade: "B+", enrollments: 134 },
    { course: "Biology", percentage: 79, grade: "B", enrollments: 98 },
  ];

  const semesterHighlights = [
    { label: "Dean's List Students", value: "15%", color: "#4CAF50" },
    { label: "Perfect Attendance", value: "73%", color: "#2196F3" },
    { label: "Assignment On-Time", value: "89%", color: "#FF9800" },
    { label: "Study Group Participation", value: "64%", color: "#9C27B0" },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: "#f8fafc" }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Student Performance Analytics Dashboard
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "700px",
              mx: "auto",
            }}
          >
            Comprehensive insights into academic performance, course engagement,
            and learning outcomes
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 4,
            mb: 6,
          }}
        >
          {/* Left Side - Academic Performance Metrics */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "white",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              mb={3}
              color="text.primary"
            >
              Academic Performance Overview
            </Typography>

            <Stack spacing={3}>
              {academicMetrics.map((metric, index) => (
                <Box key={index}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography variant="body1" fontWeight={500}>
                      {metric.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={metric.color}
                      fontWeight={600}
                    >
                      {metric.value}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={metric.value}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "rgba(0,0,0,0.08)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        backgroundColor: metric.color,
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>

            {/* Grade Distribution Chart */}
            <Box
              sx={{
                mt: 4,
                p: 3,
                background: "linear-gradient(135deg, #e8f5e8 0%, #f3e5f5 100%)",
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Typography variant="h6" fontWeight={600} mb={2}>
                Grade Distribution This Semester
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="end"
                height={100}
                mb={2}
              >
                {[
                  { grade: "A", count: 35, color: "#4CAF50" },
                  { grade: "A-", count: 45, color: "#66BB6A" },
                  { grade: "B+", count: 60, color: "#2196F3" },
                  { grade: "B", count: 40, color: "#42A5F5" },
                  { grade: "B-", count: 25, color: "#FF9800" },
                  { grade: "C+", count: 15, color: "#FFA726" },
                  { grade: "C", count: 10, color: "#FF5722" },
                ].map((item, index) => (
                  <Box key={index} sx={{ flex: 1, textAlign: "center" }}>
                    <Box
                      sx={{
                        height: `${item.count}%`,
                        background: `linear-gradient(to top, ${item.color}, ${item.color}90)`,
                        borderRadius: "4px 4px 0 0",
                        mb: 1,
                        animation: `grow 2s ease-out ${index * 0.1}s both`,
                        "@keyframes grow": {
                          from: { height: 0 },
                          to: { height: `${item.count}%` },
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="text.primary"
                    >
                      {item.grade}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.count}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Paper>

          {/* Right Side - Course Performance */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "white",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              mb={3}
              color="text.primary"
            >
              Top Performing Courses
            </Typography>

            {/* Student Engagement Visualization */}
            <Box
              sx={{
                height: 180,
                background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
                borderRadius: 3,
                mb: 3,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <MenuBook
                sx={{ fontSize: 64, color: "primary.main", opacity: 0.3 }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                }}
              >
                {semesterHighlights.map((highlight, index) => (
                  <Chip
                    key={index}
                    label={`${highlight.label}: ${highlight.value}`}
                    size="small"
                    sx={{
                      backgroundColor: highlight.color,
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>
              <Typography
                sx={{
                  position: "absolute",
                  fontSize: "0.8rem",
                  color: "text.secondary",
                  bottom: 8,
                  right: 12,
                }}
              >
                Current Semester Analytics
              </Typography>
            </Box>

            {/* Course Performance List */}
            <Stack spacing={2}>
              {coursePerformance.map((course, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      background:
                        course.percentage >= 90
                          ? "#4CAF50"
                          : course.percentage >= 85
                          ? "#2196F3"
                          : "#FF9800",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {course.grade}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={0.5}
                    >
                      <Typography variant="body2" fontWeight={500}>
                        {course.course}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontSize="0.75rem"
                        >
                          {course.enrollments} students
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary.main"
                          fontWeight={600}
                        >
                          {course.percentage}%
                        </Typography>
                      </Stack>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={course.percentage}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: "rgba(0,0,0,0.08)",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 2,
                          backgroundColor:
                            course.percentage >= 90
                              ? "#4CAF50"
                              : course.percentage >= 85
                              ? "#2196F3"
                              : "#FF9800",
                        },
                      }}
                    />
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Paper>
        </Box>

        {/* Department Achievement Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {departmentPerformance.map((achievement, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3,
                background: "white",
                border: "1px solid",
                borderColor: "divider",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  mx: "auto",
                  mb: 2,
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                }}
              >
                <achievement.icon sx={{ fontSize: 28 }} />
              </Avatar>
              <Typography
                variant="h4"
                fontWeight={700}
                color="primary.main"
                mb={1}
              >
                {achievement.value}
              </Typography>
              <Typography variant="body1" fontWeight={600} mb={0.5}>
                {achievement.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {achievement.subtitle}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Stats;
