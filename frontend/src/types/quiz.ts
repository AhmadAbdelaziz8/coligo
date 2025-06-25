export interface QuizQuestion {
  _id?: string;
  questionText: string;
  type?: "multiple-choice" | "true-false" | "short-answer";
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface Quiz {
  _id: string;
  title: string;
  topic: string;
  course: string;
  questions: QuizQuestion[];
  duration: number; // in minutes
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
