import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { registerUser } from "../../store/slices/authSlice";
import AuthPageLayout from "../../components/Auth/AuthPageLayout";
import RegisterForm from "../../components/Auth/RegisterForm";

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

  const handleTermsChange = (checked: boolean) => {
    setAgreeTerms(checked);
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <AuthPageLayout
      title="Join Our Learning Community"
      subtitle="Create your account to start your educational journey"
      features={signupFeatures}
    >
      <RegisterForm
        formData={userData}
        agreeTerms={agreeTerms}
        loading={loading}
        error={error}
        onChange={handleChange}
        onTermsChange={handleTermsChange}
        onSubmit={handleSubmit}
        onNavigateToLogin={handleNavigateToLogin}
      />
    </AuthPageLayout>
  );
};

export default RegisterPage;
