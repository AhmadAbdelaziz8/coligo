import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  Quiz,
  Announcement,
  Analytics,
  Schedule,
  Group,
  Security,
} from "@mui/icons-material";

const features = [
  {
    icon: Quiz,
    title: "Interactive Quizzes",
    description:
      "Engage with dynamic quizzes designed to test your knowledge and track your progress in real-time.",
    color: "#2196F3",
  },
  {
    icon: Announcement,
    title: "Live Announcements",
    description:
      "Stay updated with the latest course announcements and important notifications from your instructors.",
    color: "#FF9800",
  },
  {
    icon: Analytics,
    title: "Progress Analytics",
    description:
      "Monitor your academic performance with detailed analytics and personalized learning insights.",
    color: "#4CAF50",
  },
  {
    icon: Schedule,
    title: "Smart Scheduling",
    description:
      "Organize your study schedule with intelligent planning tools and deadline reminders.",
    color: "#9C27B0",
  },
  {
    icon: Group,
    title: "Collaborative Learning",
    description:
      "Connect with classmates and participate in group discussions and study sessions.",
    color: "#E91E63",
  },
  {
    icon: Security,
    title: "Secure Platform",
    description:
      "Your data is protected with enterprise-grade security and privacy measures.",
    color: "#607D8B",
  },
];

const Features: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: "#f8f9fa" }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 2,
              color: "text.primary",
            }}
          >
            Why Choose Coligo?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Discover the features that make learning more engaging, organized,
            and effective
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                flex: {
                  xs: "1 1 100%", // Full width on mobile
                  md: "1 1 calc(50% - 16px)", // Half width on medium screens
                  lg: "1 1 calc(33.333% - 22px)", // Third width on large screens
                },
                minWidth: {
                  xs: "100%",
                  md: "300px",
                  lg: "280px",
                },
                maxWidth: {
                  xs: "100%",
                  md: "calc(50% - 16px)",
                  lg: "calc(33.333% - 22px)",
                },
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  p: 3,
                  textAlign: "center",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardContent>
                  <Avatar
                    sx={{
                      width: 70,
                      height: 70,
                      mx: "auto",
                      mb: 3,
                      background: feature.color,
                    }}
                  >
                    <feature.icon sx={{ fontSize: 35, color: "white" }} />
                  </Avatar>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: "text.primary",
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
