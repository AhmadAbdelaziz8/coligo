import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { registerUser } from "../../store/slices/authSlice";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box className="flex min-h-screen items-center justify-center">
        <Paper className="p-8 w-full max-w-md">
          <Typography variant="h4" className="text-center mb-6">
            Register
          </Typography>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="mb-4"
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              className="mb-4"
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              className="mb-6"
              margin="normal"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              className="mb-4"
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
