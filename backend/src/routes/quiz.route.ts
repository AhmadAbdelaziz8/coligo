import {
  getQuizByIdController,
  getAllQuizzesController,
  createNewQuizController,
  deleteQuizController,
  updateQuizController,
} from "../controllers/quiz.controller";
import { Router } from "express";
import { adminMiddleware } from "../middleware/auth.middleware";

const router = Router();

// CREATE
router.post("/", adminMiddleware, createNewQuizController);
// READ
router.get("/", getAllQuizzesController);
router.get("/:id", getQuizByIdController);
// Update
router.put("/:id", adminMiddleware, updateQuizController);
// Delete
router.delete("/:id", adminMiddleware, deleteQuizController);

export default router;
