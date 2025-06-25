import React from "react";
import { TrendingUp as PerformanceIcon } from "@mui/icons-material";
import { PlaceholderPage } from "../components/common";

const PerformancePage: React.FC = () => {
  const features = [
    "Detailed analytics of your learning progress",
    "Performance trends and insights",
    "Time spent studying breakdown",
    "Strength and weakness analysis",
    "Comparison with class averages",
    "Personalized improvement recommendations",
  ];

  return (
    <PlaceholderPage
      title="Performance Analytics"
      description="Gain insights into your learning journey with detailed analytics"
      icon={<PerformanceIcon />}
      features={features}
    />
  );
};

export default PerformancePage;
