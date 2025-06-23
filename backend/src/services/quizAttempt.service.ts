import mongoose from "mongoose";
import { QuizAttemptSchema } from "../models/quizAttempt.model";
import { IQuizAttemptDocument, IAnswer } from "../types/quiz.types";
import { getQuizById } from "./quiz.service";

// Create the model with proper typing
const QuizAttempt = mongoose.model<IQuizAttemptDocument>(
  "QuizAttempt",
  QuizAttemptSchema
);

// CREATE - Start a new quiz attempt
export const startQuizAttempt = async (data: {
  userId: string;
  quizId: string;
}): Promise<IQuizAttemptDocument> => {
  // Get the quiz to set totalPossible
  const quiz = await getQuizById(data.quizId);
  if (!quiz) {
    throw new Error("Quiz not found");
  }

  // Calculate total possible points
  const totalPossible = quiz.questions.reduce((sum, q) => sum + q.points, 0);

  // Get the next attempt number for this user/quiz combination
  const lastAttempt = await QuizAttempt.findOne({
    userId: data.userId,
    quizId: data.quizId,
  })
    .sort({ attemptNumber: -1 })
    .exec();

  const attemptNumber = lastAttempt ? lastAttempt.attemptNumber + 1 : 1;

  const attempt = new QuizAttempt({
    ...data,
    attemptNumber,
    totalPossible,
    answers: [], // Start with empty answers
  });

  return await attempt.save();
};

// UPDATE - Save answer for a specific question
export const saveAnswer = async (
  attemptId: string,
  questionIndex: number,
  selectedOption: number
): Promise<IQuizAttemptDocument | null> => {
  const attempt = await QuizAttempt.findById(attemptId).exec();
  if (!attempt) return null;

  // Get the quiz to check correct answer
  const quiz = await getQuizById(attempt.quizId.toString());
  if (!quiz || !quiz.questions[questionIndex]) return null;

  const question = quiz.questions[questionIndex];
  const isCorrect = question.correctAnswer === selectedOption;
  const pointsEarned = isCorrect ? question.points : 0;

  // Find if answer already exists for this question
  const existingAnswerIndex = attempt.answers.findIndex(
    (a) => a.questionIndex === questionIndex
  );

  const newAnswer: IAnswer = {
    questionIndex,
    selectedOption,
    isCorrect,
    pointsEarned,
  };

  if (existingAnswerIndex >= 0) {
    // Update existing answer
    attempt.answers[existingAnswerIndex] = newAnswer;
  } else {
    // Add new answer
    attempt.answers.push(newAnswer);
  }

  // Recalculate total score
  attempt.totalScore = attempt.answers.reduce(
    (sum, a) => sum + a.pointsEarned,
    0
  );
  attempt.percentage = Math.round(
    (attempt.totalScore / attempt.totalPossible) * 100
  );

  return await attempt.save();
};

// UPDATE - Submit quiz attempt (mark as completed)
export const submitQuizAttempt = async (
  attemptId: string
): Promise<IQuizAttemptDocument | null> => {
  const attempt = await QuizAttempt.findById(attemptId).exec();
  if (!attempt) return null;

  // Calculate time spent
  const timeSpent = Math.floor(
    (new Date().getTime() - attempt.startTime.getTime()) / 1000
  );

  return await QuizAttempt.findByIdAndUpdate(
    attemptId,
    {
      endTime: new Date(),
      timeSpent,
      isCompleted: true,
      isSubmitted: true,
    },
    { new: true }
  ).exec();
};

// READ - Get attempt by ID with full details
export const getQuizAttemptById = async (
  id: string
): Promise<IQuizAttemptDocument | null> => {
  return await QuizAttempt.findById(id)
    .populate("userId", "name email")
    .populate("quizId", "title course topic")
    .exec();
};

// READ - Get all attempts for a specific quiz
export const getQuizAttempts = async (
  quizId: string
): Promise<IQuizAttemptDocument[]> => {
  return await QuizAttempt.find({ quizId })
    .populate("userId", "name email")
    .sort({ createdAt: -1 })
    .exec();
};

// READ - Get all attempts by a specific user
export const getUserAttempts = async (
  userId: string
): Promise<IQuizAttemptDocument[]> => {
  return await QuizAttempt.find({ userId })
    .populate("quizId", "title course topic dueDate")
    .sort({ createdAt: -1 })
    .exec();
};

// READ - Get user's attempts for a specific quiz
export const getUserQuizAttempts = async (
  userId: string,
  quizId: string
): Promise<IQuizAttemptDocument[]> => {
  return await QuizAttempt.find({ userId, quizId })
    .sort({ attemptNumber: -1 })
    .exec();
};

// READ - Get user's best attempt for a quiz
export const getBestAttempt = async (
  userId: string,
  quizId: string
): Promise<IQuizAttemptDocument | null> => {
  return await QuizAttempt.findOne({
    userId,
    quizId,
    isSubmitted: true,
  })
    .sort({ totalScore: -1, attemptNumber: -1 }) // Best score first, then latest attempt
    .exec();
};

// READ - Get current active attempt (unsubmitted)
export const getCurrentAttempt = async (
  userId: string,
  quizId: string
): Promise<IQuizAttemptDocument | null> => {
  return await QuizAttempt.findOne({
    userId,
    quizId,
    isSubmitted: false,
  })
    .sort({ attemptNumber: -1 }) // Latest attempt
    .exec();
};

// UTILITY - Calculate quiz statistics
export const getQuizStatistics = async (quizId: string) => {
  const attempts = await QuizAttempt.find({
    quizId,
    isSubmitted: true,
  }).exec();

  if (attempts.length === 0) {
    return {
      totalAttempts: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      passRate: 0,
    };
  }

  const scores = attempts.map((a) => a.percentage);
  const averageScore =
    scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);
  const passRate =
    (scores.filter((score) => score >= 60).length / scores.length) * 100;

  return {
    totalAttempts: attempts.length,
    averageScore: Math.round(averageScore),
    highestScore,
    lowestScore,
    passRate: Math.round(passRate),
  };
};
