import React from "react";
import { Quiz as QuizIcon } from "@mui/icons-material";
import { PlaceholderPage } from "../components/common";

const QuizzesPage: React.FC = () => {
  const features = [
    "Take interactive quizzes and assessments",
    "Practice questions by subject and difficulty",
    "Timed quiz sessions with automatic submission",
    "Instant feedback and explanations",
    "Track quiz scores and improvement",
    "Retake quizzes to improve performance",
  ];

  return (
    <PlaceholderPage
      title="Quizzes & Assessments"
      description="Test your knowledge with interactive quizzes and practice tests"
      icon={<QuizIcon />}
      features={features}
    />
  );
};

export default QuizzesPage;
