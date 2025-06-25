import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { loginUser, registerUser } from "../store/slices/authSlice";
import AuthPageLayout from "../components/Auth/AuthPageLayout";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

const AuthPage: React.FC = () => {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(
    location.pathname === "/register"
  );

  useEffect(() => {
    setIsRegister(location.pathname === "/register");
  }, [location.pathname]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTermsChange = (checked: boolean) => {
    setAgreeTerms(checked);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(loginData)).unwrap();

      if (result.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    try {
      await dispatch(registerUser(registerData)).unwrap();
      // After successful registration, switch to login view
      toggleForm();
      // Optionally, you can automatically log in the user here.
      // For now, we'll just switch to the login form.
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    navigate(isRegister ? "/login" : "/register");
  };

  const handleNavigateToLogin = () => {
    setIsRegister(false);
    navigate("/login");
  };

  const handleNavigateToRegister = () => {
    setIsRegister(true);
    navigate("/register");
  };

  if (isAuthenticated) {
    return user?.role === "admin" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/dashboard" />
    );
  }

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

  return (
    <AuthPageLayout
      title={isRegister ? "Join Our Learning Community" : "Welcome Back"}
      subtitle={
        isRegister
          ? "Create your account to start your educational journey"
          : "Sign in to continue your learning journey"
      }
      features={signupFeatures}
    >
      {isRegister ? (
        <RegisterForm
          formData={registerData}
          agreeTerms={agreeTerms}
          loading={loading}
          error={error}
          onChange={handleRegisterChange}
          onTermsChange={handleTermsChange}
          onSubmit={handleRegisterSubmit}
          onNavigateToLogin={handleNavigateToLogin}
        />
      ) : (
        <LoginForm
          formData={loginData}
          onChange={handleLoginChange}
          onSubmit={handleLoginSubmit}
          loading={loading}
          error={error}
          onNavigateToRegister={handleNavigateToRegister}
        />
      )}
    </AuthPageLayout>
  );
};

export default AuthPage;
