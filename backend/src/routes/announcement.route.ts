import { Router } from "express";

import {
  createAnnouncementController,
  getAnnouncementByIdController,
  getAllAnnouncementsController,
  updateAnnouncementController,
  deleteAnnouncementController,
} from "../controllers/announcement.controller";
import { adminMiddleware } from "../middleware/auth.middleware";

const router = Router();

// CREATE
router.post("/", adminMiddleware, createAnnouncementController);
// READ
router.get("/", getAllAnnouncementsController);
router.get("/:id", getAnnouncementByIdController);
// Update
router.put("/:id", adminMiddleware, updateAnnouncementController);
// Delete
router.delete("/:id", adminMiddleware, deleteAnnouncementController);

export default router;
