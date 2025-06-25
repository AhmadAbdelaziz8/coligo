import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Link,
} from "@mui/material";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  onChange,
  onSubmit,
  loading,
  error,
}) => {
  return (
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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={onSubmit}>
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
            value={formData.email}
            onChange={onChange}
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
            placeholder="••••••"
            value={formData.password}
            onChange={onChange}
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
              backgroundColor: "#f5f5f5",
            },
            "&:disabled": {
              backgroundColor: "rgba(255,255,255,0.7)",
              color: "rgba(45,90,135,0.7)",
            },
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        {/* Register Link */}
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}
          <Link
            href="/register"
            sx={{
              color: "#4fc3f7",
              textDecoration: "none",
              fontWeight: 500,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sign up
          </Link>
        </Typography>
      </form>
    </Paper>
  );
};

export default LoginForm;
