import React from "react";
import { School as SchoolIcon } from "@mui/icons-material";
import { PlaceholderPage } from "../components/common";

const CoursesPage: React.FC = () => {
  const features = [
    "Browse available courses and programs",
    "Enroll in new courses with one click",
    "Track your course progress and completion",
    "Access course materials and resources",
    "View course schedules and timings",
    "Rate and review completed courses",
  ];

  return (
    <PlaceholderPage
      title="Courses"
      description="Discover and manage your educational courses"
      icon={<SchoolIcon />}
      features={features}
    />
  );
};

export default CoursesPage;
