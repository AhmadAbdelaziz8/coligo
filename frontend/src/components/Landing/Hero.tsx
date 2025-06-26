import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  Chip,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Assessment,
  People,
  BookmarkBorder,
  Schedule,
  EmojiEvents,
  PlayArrow,
} from "@mui/icons-material";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const academicStats = [
    { value: "95%", label: "Quiz Completion Rate", color: "#4CAF50" },
    { value: "1,250", label: "Active Students", color: "#2196F3" },
    { value: "48", label: "Course Offerings", color: "#FF9800" },
    { value: "24/7", label: "Learning Support", color: "#9C27B0" },
  ];

  const learningMetrics = [
    { icon: Assessment, label: "Quiz Performance", percent: 87 },
    { icon: Schedule, label: "Assignment Completion", percent: 92 },
    { icon: People, label: "Study Groups", percent: 74 },
    { icon: BookmarkBorder, label: "Course Progress", percent: 83 },
    { icon: EmojiEvents, label: "Achievement Rate", percent: 78 },
  ];

  const topUniversities = ["Harvard", "MIT", "Stanford", "Yale", "Princeton"];

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #4A6CF7 0%, #667eea 50%, #764ba2 100%)",
        color: "white",
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          animation: "float 6s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          left: "8%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />

      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 6, lg: 8 },
            alignItems: "center",
          }}
        >
          {/* Left Content */}
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4.2rem" },
                fontWeight: 800,
                mb: 3,
                lineHeight: 1.1,
                background: "linear-gradient(45deg, #fff 30%, #f0f0f0 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Track Your Academic Performance and Learning Analytics
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "1.1rem", md: "1.3rem" },
                mb: 4,
                opacity: 0.9,
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Discover your learning patterns, quiz performance, and academic
              progress with comprehensive student analytics
            </Typography>

            {/* Trusted by section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body2"
                sx={{ mb: 2, opacity: 0.8, fontWeight: 500 }}
              >
                Trusted by top universities worldwide
              </Typography>
              <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
                {topUniversities.map((university, index) => (
                  <Chip
                    key={index}
                    label={university}
                    sx={{
                      background: "rgba(255,255,255,0.15)",
                      color: "white",
                      fontWeight: 500,
                      px: 2,
                      "&:hover": {
                        background: "rgba(255,255,255,0.25)",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* CTA Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 4 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrow />}
                onClick={() => navigate("/register")}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  background: "white",
                  color: "primary.main",
                  borderRadius: 3,
                  "&:hover": {
                    background: "rgba(255,255,255,0.9)",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                }}
              >
                Start Learning
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                  borderRadius: 3,
                  "&:hover": {
                    borderColor: "white",
                    background: "rgba(255,255,255,0.1)",
                    transform: "translateY(-3px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Student Login
              </Button>
            </Stack>
          </Box>

          {/* Right Content - Academic Statistics & Performance Metrics */}
          <Box sx={{ position: "relative" }}>
            {/* Main Academic Statistics Circles */}
            <Box
              sx={{
                position: "relative",
                height: 400,
                display: { xs: "none", md: "block" },
              }}
            >
              {/* Large center circle - Overall GPA */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                  zIndex: 3,
                }}
              >
                <Typography variant="h3" fontWeight={700} color="primary.main">
                  3.8
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="center"
                >
                  Average GPA
                </Typography>
              </Box>

              {/* Surrounding circles with academic metrics */}
              {learningMetrics.map((metric, index) => {
                const angle = index * 72 * (Math.PI / 180); // 72 degrees apart
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <Box
                    key={index}
                    sx={{
                      position: "absolute",
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: "translate(-50%, -50%)",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.9)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 6px 25px rgba(0,0,0,0.15)",
                      animation: `float ${3 + index}s ease-in-out infinite`,
                      animationDelay: `${index * 0.5}s`,
                    }}
                  >
                    <metric.icon
                      sx={{ fontSize: 24, color: "primary.main", mb: 0.5 }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      textAlign="center"
                      sx={{ fontSize: "0.7rem" }}
                    >
                      {metric.label.split(" ")[0]}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      color="primary.main"
                    >
                      {metric.percent}%
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Mobile Academic Statistics */}
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                  mb: 4,
                }}
              >
                {academicStats.map((stat, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      background: "rgba(255,255,255,0.95)",
                      borderRadius: 3,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      color={stat.color}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
