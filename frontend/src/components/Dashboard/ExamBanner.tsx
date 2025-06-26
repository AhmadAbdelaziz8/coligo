import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ExamBanner: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleViewTips = () => {
    navigate("/dashboard/exams");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        mb: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 3, md: 0 },
        }}
      >
        {/* Left Content */}
        <Box
          sx={{
            flex: 1,
            pr: { xs: 0, md: 4 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#1565c0",
              mb: { xs: 1.5, md: 2 },
              fontSize: { xs: "1.6rem", sm: "2.2rem", md: "2.5rem" },
              letterSpacing: { xs: "0.5px", md: "1px" },
            }}
          >
            {t("exam.title")}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#424242",
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              lineHeight: 1.6,
              maxWidth: { xs: "100%", md: "500px" },
            }}
          >
            {t("exam.description")}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#81c784",
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "12px", sm: "14px" },
              fontStyle: "italic",
              display: { xs: "none", sm: "block" }, // Hide quote on very small screens
            }}
          >
            "{t("exam.quote")}" - {t("exam.quoteAuthor")}
          </Typography>

          <Button
            variant="contained"
            onClick={handleViewTips}
            sx={{
              backgroundColor: "#4fc3f7",
              color: "white",
              px: { xs: 3, sm: 4 },
              py: { xs: 1.2, sm: 1.5 },
              borderRadius: 3,
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(79, 195, 247, 0.3)",
              "&:hover": {
                backgroundColor: "#29b6f6",
                boxShadow: "0 6px 20px rgba(79, 195, 247, 0.4)",
              },
            }}
          >
            {t("exam.viewTips")}
          </Button>
        </Box>

        {/* Right Illustration */}
        <Box
          sx={{
            flex: { xs: 1, md: 0.8 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            mt: { xs: 2, md: 0 },
          }}
        >
          {/* Study Illustration - Using CSS to create a similar design */}
          <Box
            sx={{
              width: { md: 250, lg: 300 },
              height: { md: 150, lg: 200 },
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {/* Laptop */}
            <Box
              sx={{
                width: { md: 100, lg: 120 },
                height: { md: 65, lg: 80 },
                backgroundColor: "#4fc3f7",
                borderRadius: 2,
                position: "relative",
                transform: "rotate(-10deg)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 5,
                  left: 5,
                  right: 5,
                  bottom: 15,
                  backgroundColor: "white",
                  borderRadius: 1,
                },
              }}
            />

            {/* Papers */}
            <Box
              sx={{
                width: { md: 50, lg: 60 },
                height: { md: 65, lg: 80 },
                backgroundColor: "white",
                border: "2px solid #4fc3f7",
                borderRadius: 1,
                position: "absolute",
                left: { md: 40, lg: 50 },
                top: { md: 15, lg: 20 },
                transform: "rotate(15deg)",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 10,
                  left: 5,
                  right: 5,
                  height: 2,
                  backgroundColor: "#4fc3f7",
                },
              }}
            />

            {/* Calculator */}
            <Box
              sx={{
                width: { md: 35, lg: 40 },
                height: { md: 40, lg: 50 },
                backgroundColor: "#81c784",
                borderRadius: 1,
                position: "absolute",
                right: { md: 65, lg: 80 },
                bottom: { md: 30, lg: 40 },
                transform: "rotate(-20deg)",
              }}
            />

            {/* Floating Elements */}
            <Box
              sx={{
                position: "absolute",
                width: { md: 15, lg: 20 },
                height: { md: 15, lg: 20 },
                backgroundColor: "#4fc3f7",
                borderRadius: "50%",
                top: { md: 5, lg: 10 },
                right: { md: 15, lg: 20 },
                opacity: 0.7,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                width: { md: 12, lg: 15 },
                height: { md: 12, lg: 15 },
                backgroundColor: "#81c784",
                borderRadius: "50%",
                bottom: { md: 5, lg: 10 },
                left: { md: 25, lg: 30 },
                opacity: 0.7,
              }}
            />
          </Box>
        </Box>

        {/* Mobile Simplified Illustration */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 40,
              backgroundColor: "#4fc3f7",
              borderRadius: 2,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 3,
                left: 3,
                right: 3,
                bottom: 8,
                backgroundColor: "white",
                borderRadius: 1,
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ExamBanner;
