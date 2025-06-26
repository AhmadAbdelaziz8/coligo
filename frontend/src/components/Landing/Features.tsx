import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import {
  Quiz,
  Announcement,
  Analytics,
  Schedule,
  Group,
  Security,
  Assessment,
  BookmarkBorder,
  TrendingUp,
  School,
  EmojiEvents,
  Assignment,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Quiz,
    title: "Interactive Quiz System",
    description:
      "Take comprehensive quizzes with instant feedback, detailed explanations, and progress tracking to enhance your learning experience.",
    color: "#2196F3",
    category: "Assessment",
    benefits: ["Instant Feedback", "Progress Tracking", "Multiple Formats"]
  },
  {
    icon: Assessment,
    title: "Academic Analytics",
    description:
      "Monitor your academic performance with detailed analytics, grade trends, and personalized insights to improve your studies.",
    color: "#4CAF50",
    category: "Analytics",
    benefits: ["Grade Tracking", "Performance Insights", "Goal Setting"]
  },
  {
    icon: Announcement,
    title: "Real-time Announcements",
    description:
      "Stay updated with the latest course announcements, assignment deadlines, and important notifications from your instructors.",
    color: "#FF9800",
    category: "Communication",
    benefits: ["Instant Updates", "Priority Alerts", "Mobile Notifications"]
  },
  {
    icon: Schedule,
    title: "Smart Study Planner",
    description:
      "Organize your academic schedule with intelligent planning tools, deadline reminders, and study session optimization.",
    color: "#9C27B0",
    category: "Planning",
    benefits: ["Auto Scheduling", "Deadline Tracking", "Study Optimization"]
  },
  {
    icon: Group,
    title: "Study Collaboration",
    description:
      "Connect with classmates, form study groups, share notes, and collaborate on assignments in a secure academic environment.",
    color: "#E91E63",
    category: "Collaboration",
    benefits: ["Study Groups", "Note Sharing", "Peer Support"]
  },
  {
    icon: EmojiEvents,
    title: "Achievement System",
    description:
      "Earn badges, track milestones, and celebrate academic achievements with our gamified learning experience.",
    color: "#607D8B",
    category: "Motivation",
    benefits: ["Achievement Badges", "Progress Milestones", "Leaderboards"]
  },
];

const Features: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: "white" }}>
      <Container maxWidth="lg">
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
            Why Choose Coligo for Your Academic Journey?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "600px",
              mx: "auto",
              mb: 4,
            }}
          >
            Discover the comprehensive tools that make learning more engaging, organized, and effective for modern students
          </Typography>
          
          {/* Feature Categories */}
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center" 
            flexWrap="wrap" 
            useFlexGap
            sx={{ mb: 4 }}
          >
            {["Assessment", "Analytics", "Communication", "Planning", "Collaboration", "Motivation"].map((category) => (
              <Chip
                key={category}
                label={category}
                variant="outlined"
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "primary.50"
                  }
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 4,
            mb: 8
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: "100%",
                p: { xs: 2, sm: 3 },
                textAlign: "left",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 4,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                  borderColor: feature.color,
                },
              }}
            >
              <CardContent sx={{ p: 0 }}>
                {/* Header */}
                <Stack direction="row" alignItems="flex-start" spacing={2} mb={3}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      background: `linear-gradient(135deg, ${feature.color}, ${feature.color}90)`,
                      boxShadow: `0 4px 16px ${feature.color}40`,
                    }}
                  >
                    <feature.icon sx={{ fontSize: 28, color: "white" }} />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Chip
                      label={feature.category}
                      size="small"
                      sx={{
                        backgroundColor: `${feature.color}20`,
                        color: feature.color,
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        fontSize: { xs: "1.1rem", sm: "1.25rem" },
                      }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                </Stack>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    mb: 3,
                  }}
                >
                  {feature.description}
                </Typography>

                {/* Benefits */}
                <Box mb={3}>
                  <Typography variant="body2" fontWeight={600} mb={1} color="text.primary">
                    Key Benefits:
                  </Typography>
                  <Stack spacing={1}>
                    {feature.benefits.map((benefit, idx) => (
                      <Stack key={idx} direction="row" alignItems="center" spacing={1}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: feature.color,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {benefit}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>

                {/* CTA */}
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: feature.color,
                    color: feature.color,
                    "&:hover": {
                      borderColor: feature.color,
                      backgroundColor: `${feature.color}10`,
                    },
                  }}
                  onClick={() => navigate("/register")}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Call to Action Section */}
        <Box
          sx={{
            textAlign: "center",
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <School sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
          <Typography variant="h4" fontWeight={700} mb={2}>
            Ready to Transform Your Learning Experience?
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, maxWidth: "600px", mx: "auto" }}>
            Join thousands of students who are already using Coligo to excel in their academic journey
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/register")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                background: "white",
                color: "primary.main",
                "&:hover": {
                  background: "rgba(255,255,255,0.9)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Start Free Today
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/login")}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                borderColor: "rgba(255,255,255,0.5)",
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  background: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              View Demo
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
