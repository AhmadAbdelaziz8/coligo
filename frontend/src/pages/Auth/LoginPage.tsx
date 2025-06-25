import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { loginUser } from "../../store/slices/authSlice";
import AuthPageLayout from "../../components/Auth/AuthPageLayout";
import LoginForm from "../../components/Auth/LoginForm";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(formData)).unwrap();

      // Redirect based on user role
      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (isAuthenticated) {
    return user?.role === "admin" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/dashboard" />
    );
  }

  return (
    <AuthPageLayout
      title="Welcome Back"
      subtitle="Sign in to continue your learning journey"
    >
      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </AuthPageLayout>
  );
};

export default LoginPage;
