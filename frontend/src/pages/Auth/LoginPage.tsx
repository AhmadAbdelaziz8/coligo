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
import {  ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { loginUser } from "../../store/slices/authSlice";
import AuthFeatures from "../../components/Auth/AuthFeatures";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
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
          Back to templates
        </Typography>
      </IconButton>

      {/* Left Side - Features */}
      <AuthFeatures />

      {/* Right Side - Sign In Form */}
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
            Sign in
          </Typography>

          <form onSubmit={handleSubmit}>
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
                placeholder="your@email.com"
                value={credentials.email}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Password
                </Typography>
                <Link
                  href="#"
                  sx={{
                    color: "#4fc3f7",
                    textDecoration: "none",
                    fontSize: "14px",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                fullWidth
                name="password"
                type="password"
                placeholder="••••••"
                value={credentials.password}
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

            {/* Remember Me */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    "&.Mui-checked": {
                      color: "#4fc3f7",
                    },
                  }}
                />
              }
              label={
                <Typography sx={{ color: "rgba(255,255,255,0.8)" }}>
                  Remember me
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            {/* Sign In Button */}
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
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            {/* Sign Up Link */}
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "rgba(255,255,255,0.8)" }}
            >
              Don't have an account?{" "}
              <Link
                onClick={() => navigate("/register")}
                sx={{
                  color: "#4fc3f7",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign up
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

export default LoginPage;
