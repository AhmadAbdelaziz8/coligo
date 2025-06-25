import React from "react";
import { Assessment as GradeIcon } from "@mui/icons-material";
import { PlaceholderPage } from "../components/common";

const GradebookPage: React.FC = () => {
  const features = [
    "View all your grades in one place",
    "Track assignment and quiz scores",
    "Calculate GPA and semester averages",
    "Export grade reports and transcripts",
    "Compare performance across subjects",
    "Set grade goals and targets",
  ];

  return (
    <PlaceholderPage
      title="Gradebook"
      description="Monitor your academic performance and grades"
      icon={<GradeIcon />}
      features={features}
    />
  );
};

export default GradebookPage;
