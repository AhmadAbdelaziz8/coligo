import React from "react";
import { Box, Typography } from "@mui/material";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface AuthFeaturesProps {
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    icon: "⚡",
    title: "Adaptable performance",
    description:
      "Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.",
  },
  {
    icon: "🔧",
    title: "Built to last",
    description:
      "Experience unmatched durability that goes above and beyond with lasting investment.",
  },
  {
    icon: "👍",
    title: "Great user experience",
    description:
      "Integrate our product into your routine with an intuitive and easy-to-use interface.",
  },
  {
    icon: "🚀",
    title: "Innovative functionality",
    description:
      "Stay ahead with features that set new standards, addressing your evolving needs better than the rest.",
  },
];

const AuthFeatures: React.FC<AuthFeaturesProps> = ({
  features = defaultFeatures,
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
      {/* Logo */}
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#4fc3f7",
            fontWeight: 700,
            mb: 1,
          }}
        >
          🎓 Coligo
        </Typography>
      </Box>

      {/* Features List */}
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
                backgroundColor: "#4fc3f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 3,
                flexShrink: 0,
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }}>
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
    </Box>
  );
};

export default AuthFeatures;
