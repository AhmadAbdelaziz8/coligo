export interface QuizQuestion {
  _id: string;
  question: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  correctAnswer: string | number;
  points: number;
}

export interface Quiz {
  _id: string;
  title: string;
  topic: string;
  course: string;
  questions: QuizQuestion[];
  timeLimit: number;
  totalPoints: number;
  isActive: boolean;
  dueDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizAttempt {
  _id: string;
  quiz: string | Quiz;
  student: string;
  answers: Record<string, any>;
  score: number;
  totalPoints: number;
  submittedAt: string;
  timeSpent: number;
}

export interface QuizSubmission {
  quizId: string;
  answers: Record<string, any>;
}
