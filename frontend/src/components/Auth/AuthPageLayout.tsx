import React from "react";
import { Box } from "@mui/material";
import AuthFeatures from "./AuthFeatures";
import BackButton from "./BackButton";

interface AuthPageLayoutProps {
  children: React.ReactNode;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children }) => {
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
      <BackButton />

      {/* Left Side - Features */}
      <AuthFeatures />

      {/* Right Side - Form Content */}
      <Box
        sx={{
          flex: { xs: 1, md: 0.6 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthPageLayout;
