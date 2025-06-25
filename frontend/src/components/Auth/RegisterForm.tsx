import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  Alert,
} from "@mui/material";

interface RegisterFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
  };
  agreeTerms: boolean;
  loading: boolean;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTermsChange: (checked: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  onNavigateToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  agreeTerms,
  loading,
  error,
  onChange,
  onTermsChange,
  onSubmit,
  onNavigateToLogin,
}) => {
  const textFieldStyles = {
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
  };

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
        Create Account
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={onSubmit}>
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
            value={formData.name}
            onChange={onChange}
            required
            sx={textFieldStyles}
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
            value={formData.email}
            onChange={onChange}
            required
            sx={textFieldStyles}
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
            value={formData.password}
            onChange={onChange}
            required
            sx={textFieldStyles}
          />
        </Box>

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
            onClick={onNavigateToLogin}
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
    </Paper>
  );
};

export default RegisterForm;
