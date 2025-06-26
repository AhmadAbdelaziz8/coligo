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
