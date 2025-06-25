import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  IconButton,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { registerUser } from "../../store/slices/authSlice";
import AuthFeatures from "../../components/Auth/AuthFeatures";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Education-specific features for signup page
  const signupFeatures = [
    {
      icon: "⚡",
      title: "Smart Learning Platform",
      description:
        "Access interactive quizzes, track your progress, and receive personalized learning recommendations.",
    },
    {
      icon: "🔧",
      title: "Real-time Collaboration",
      description:
        "Connect with classmates, join study groups, and participate in live discussions with instant messaging.",
    },
    {
      icon: "👍",
      title: "Comprehensive Analytics",
      description:
        "Monitor your academic performance with detailed insights, grade tracking, and progress visualization.",
    },
    {
      icon: "🚀",
      title: "Mobile-First Design",
      description:
        "Study anywhere, anytime with our responsive design that works seamlessly across all your devices.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    dispatch(registerUser(userData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e4d72 0%, #2d5a87 100%)",
        display: "flex",
        position: "relative",
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        <ArrowBack />
        <Typography variant="body2" sx={{ ml: 1 }}>
          Back to Home Page
        </Typography>
      </IconButton>

      {/* Left Side - Features */}
      <AuthFeatures features={signupFeatures} />

      {/* Right Side - Sign Up Form */}
      <Box
        sx={{
          flex: { xs: 1, md: 0.6 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 440,
            p: 4,
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontWeight: 600,
              mb: 4,
              textAlign: "center",
            }}
          >
            Create Account
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}
              >
                Full Name
              </Typography>
              <TextField
                fullWidth
                name="name"
                placeholder="Enter your full name"
                value={userData.name}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 2,
                    color: "white",
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid #4fc3f7",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255,255,255,0.5)",
                  },
                }}
              />
            </Box>

            {/* Email Field */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="your@email.com"
                value={userData.email}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 2,
                    color: "white",
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid #4fc3f7",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255,255,255,0.5)",
                  },
                }}
              />
            </Box>

            {/* Password Field */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.8)", mb: 1 }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={userData.password}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: 2,
                    color: "white",
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid #4fc3f7",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255,255,255,0.5)",
                  },
                }}
              />
            </Box>

            {/* Terms Agreement */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    "&.Mui-checked": {
                      color: "#4fc3f7",
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}
                >
                  I agree to the{" "}
                  <Link
                    href="#"
                    sx={{ color: "#4fc3f7", textDecoration: "none" }}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    sx={{ color: "#4fc3f7", textDecoration: "none" }}
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            {/* Create Account Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                backgroundColor: "white",
                color: "#2d5a87",
                fontWeight: 600,
                fontSize: "16px",
                textTransform: "none",
                mb: 3,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.9)",
                },
                "&:disabled": {
                  backgroundColor: "rgba(255,255,255,0.5)",
                },
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            {/* Sign In Link */}
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "rgba(255,255,255,0.8)" }}
            >
              Already have an account?{" "}
              <Link
                onClick={() => navigate("/login")}
                sx={{
                  color: "#4fc3f7",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </form>

          {error && (
            <Typography
              variant="body2"
              sx={{
                color: "#ff5252",
                textAlign: "center",
                mt: 2,
                p: 2,
                backgroundColor: "rgba(255,82,82,0.1)",
                borderRadius: 1,
                border: "1px solid rgba(255,82,82,0.2)",
              }}
            >
              {error}
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default RegisterPage;
