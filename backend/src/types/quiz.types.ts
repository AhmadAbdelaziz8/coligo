import { Document } from "mongoose";

// Question interface for quiz questions
export interface IQuestion {
  questionText: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  points: number;
}

export interface IQuiz {
  title: string;
  course: string;
  topic: string;
  dueDate: Date;
  duration: number; // in minutes
  totalMarks: number;
  instructions?: string;
  questions: IQuestion[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuizDocument extends IQuiz, Document {}

export interface IAnswer {
  questionIndex: number;
  selectedOption: number;
  isCorrect: boolean;
  pointsEarned: number;
}

export interface IQuizAttempt {
  userId: string;
  quizId: string;
  attemptNumber: number;
  answers: IAnswer[];
  totalScore: number;
  totalPossible: number;
  percentage: number;
  startTime: Date;
  endTime?: Date;
  timeSpent: number;
  isCompleted: boolean;
  isSubmitted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuizAttemptDocument extends IQuizAttempt, Document {}
