import mongoose from "mongoose";
import { QuizSchema } from "../models/quiz.model";
import { IQuizDocument, IQuestion } from "../types/quiz.types";

// Create the model with proper typing
const Quiz = mongoose.model<IQuizDocument>("Quiz", QuizSchema);

// CREATE - Add new quiz
export const createQuiz = async (data: {
  title: string;
  course: string;
  topic: string;
  dueDate: Date;
  duration: number;
  totalMarks: number;
  instructions?: string;
  questions: IQuestion[];
}): Promise<IQuizDocument> => {
  const quiz = new Quiz(data);
  return await quiz.save();
};

// READ - Get all active quizzes
export const getAllQuizzes = async (): Promise<IQuizDocument[]> => {
  return await Quiz.find({ isActive: true })
    .sort({ dueDate: 1 }) // Closest due date first
    .exec();
};

// READ - Get quizzes due soon (for "What's due" section)
export const getUpcomingQuizzes = async (
  days: number = 7
): Promise<IQuizDocument[]> => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);

  return await Quiz.find({
    isActive: true,
    dueDate: {
      $gte: new Date(), // From now
      $lte: futureDate, // To X days from now
    },
  })
    .sort({ dueDate: 1 })
    .exec();
};

// READ - Get single quiz by ID
export const getQuizById = async (
  id: string
): Promise<IQuizDocument | null> => {
  return await Quiz.findById(id).exec();
};

// UPDATE - Update quiz
export const updateQuiz = async (
  id: string,
  data: Partial<{
    title: string;
    course: string;
    topic: string;
    dueDate: Date;
    duration: number;
    totalMarks: number;
    instructions: string;
    questions: IQuestion[];
    isActive: boolean;
  }>
): Promise<IQuizDocument | null> => {
  return await Quiz.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).exec();
};

// DELETE - Remove quiz (soft delete - mark as inactive)
export const deleteQuiz = async (id: string): Promise<IQuizDocument | null> => {
  return await Quiz.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  ).exec();
};

// UTILITY - Get quizzes by course
export const getQuizzesByCourse = async (
  course: string
): Promise<IQuizDocument[]> => {
  return await Quiz.find({ course, isActive: true })
    .sort({ dueDate: 1 })
    .exec();
};
