export interface QuizQuestion {
  _id?: string;
  question: string;
  questionText?: string; // Keep for backwards compatibility
  type?: "multiple-choice" | "true-false" | "short-answer";
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Quiz {
  _id: string;
  title: string;
  description?: string;
  topic: string;
  subject?: string;
  course: string;
  questions: QuizQuestion[];
  duration?: number; // in minutes (keep for backwards compatibility)
  timeLimit: number; // in minutes
  difficulty: string;
  totalMarks: number;
  isActive: boolean;
  dueDate: string;
  instructions?: string;
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
