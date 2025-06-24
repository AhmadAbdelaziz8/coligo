import {
  getQuizByIdController,
  getAllQuizzesController,
  createNewQuizController,
  deleteQuizController,
  updateQuizController,
} from "../controllers/quiz.controller";
import { Router } from "express";

const router = Router();

// CREATE
router.post("/", createNewQuizController);
// READ
router.get("/", getAllQuizzesController);
router.get("/:id", getQuizByIdController);
// Update
router.post("/:id", updateQuizController);
// Delete
router.delete("/:id", deleteQuizController);

export default router;
