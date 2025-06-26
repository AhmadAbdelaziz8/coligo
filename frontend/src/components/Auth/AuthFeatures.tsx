import React from "react";
import { Box, Typography } from "@mui/material";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface AuthFeaturesProps {
  title: string;
  subtitle: string;
  features?: Feature[] | undefined;
}

const AuthFeatures: React.FC<AuthFeaturesProps> = ({
  title,
  subtitle,
  features,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        justifyContent: "center",
        px: 6,
        py: 8,
      }}
    >
      {/* Title and Subtitle */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "rgba(255,255,255,0.7)",
            fontWeight: 400,
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Features List */}
      {features && (
        <Box sx={{ space: 4 }}>
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "flex-start", mb: 4 }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "rgba(79, 195, 247, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 3,
                  flexShrink: 0,
                  border: "1px solid rgba(79, 195, 247, 0.2)",
                }}
              >
                <Typography variant="h6" sx={{ color: "#4fc3f7" }}>
                  {feature.icon}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "white", fontWeight: 600, mb: 1 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AuthFeatures;
