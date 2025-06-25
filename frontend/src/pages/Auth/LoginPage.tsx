import React from "react";
import AuthPageLayout from "../../components/Auth/AuthPageLayout";
import LoginForm from "../../components/Auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <AuthPageLayout>
      <LoginForm />
    </AuthPageLayout>
  );
};

export default LoginPage;
