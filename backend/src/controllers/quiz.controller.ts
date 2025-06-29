import { Response, Request, NextFunction } from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
} from "../services/quiz.service";

// Create new quiz
export const createNewQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const quiz = await createQuiz(req.body);
    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: quiz,
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get quizes
export const getAllQuizzesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const quizzes = await getAllQuizzes();
    res
      .status(200)
      .json({ success: true, data: quizzes, count: quizzes.length });
  } catch (error) {
    console.error("Error getting quizzes:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getQuizByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const quiz = await getQuizById(id);
    if (!quiz) {
      res.status(404).json({ success: false, message: "Quiz not found" });
      return;
    }
    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    console.error("Error getting quiz:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Update quiz, for admin
export const updateQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedQuiz = await updateQuiz(id, req.body);
    if (!updatedQuiz) {
      res.status(404).json({ success: false, message: "Quiz not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      data: updatedQuiz,
    });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Delete quiz, by admin
export const deleteQuizController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedQuiz = await deleteQuiz(id);
    if (!deletedQuiz) {
      res.status(404).json({ success: false, message: "Quiz not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
