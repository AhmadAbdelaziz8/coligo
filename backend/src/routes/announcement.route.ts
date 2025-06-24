import { Router } from "express";

import {
  createAnnouncementController,
  getAnnouncementByIdController,
  getAllAnnouncementsController,
  updateAnnouncementController,
  deleteAnnouncementController,
} from "../controllers/announcement.controller";

const router = Router();

// CREATE
router.post("/", createAnnouncementController);
// READ
router.get("/", getAllAnnouncementsController);
router.get("/:id", getAnnouncementByIdController);
// Update
router.put("/:id", updateAnnouncementController);
// Delete
router.delete("/:id", deleteAnnouncementController);

export default router;
