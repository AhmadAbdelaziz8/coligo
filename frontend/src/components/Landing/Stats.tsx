import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";

const stats = [
  {
    number: "10,000+",
    label: "Active Students",
    description: "Learning every day",
  },
  {
    number: "500+",
    label: "Interactive Quizzes",
    description: "Across all subjects",
  },
  {
    number: "95%",
    label: "Success Rate",
    description: "Student satisfaction",
  },
  {
    number: "24/7",
    label: "Support",
    description: "Always here to help",
  },
];

const Stats: React.FC = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Trusted by Students Worldwide
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Join thousands of students who are already achieving their academic
            goals with Coligo
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 3,
                  color: "white",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.15)",
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                  }}
                >
                  {stat.number}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                  }}
                >
                  {stat.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Stats;
