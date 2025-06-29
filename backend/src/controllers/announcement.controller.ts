import { Request, Response, NextFunction } from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
} from "../services/announcement.service";

// Create the announcement
export const createAnnouncementController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, content, instructor, instructorAvatar } = req.body;

    // Basic validation
    if (!title || !content || !instructor) {
      res.status(400).json({
        success: false,
        message: "Title, content, and instructor are required",
      });
      return;
    }

    const announcement = await createAnnouncement({
      title,
      content,
      instructor,
      instructorAvatar,
    });

    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      data: announcement,
    });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get the announcements
export const getAllAnnouncementsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const announcements = await getAllAnnouncements();

    // check if all the announcements exist
    if (!announcements) {
      res.status(404).json({
        success: false,
        message: "Announcements not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Announcements retrieved successfully",
      data: announcements,
      count: announcements.length,
    });
  } catch (error) {
    console.error("Error getting announcements:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getAnnouncementByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const announcement = await getAnnouncementById(id);

    if (!announcement) {
      res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Announcement retrieved successfully",
      data: announcement,
    });
  } catch (error) {
    console.error("Error getting announcement:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update the announcement
export const updateAnnouncementController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, instructor, instructorAvatar } = req.body;

    // Check if announcement exists
    const existingAnnouncement = await getAnnouncementById(id);
    if (!existingAnnouncement) {
      res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
      return;
    }

    const updatedAnnouncement = await updateAnnouncement(id, {
      title,
      content,
      instructor,
      instructorAvatar,
    });

    res.status(200).json({
      success: true,
      message: "Announcement updated successfully",
      data: updatedAnnouncement,
    });
  } catch (error) {
    console.error("Error updating announcement:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete the announcement
export const deleteAnnouncementController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedAnnouncement = await deleteAnnouncement(id);

    if (!deletedAnnouncement) {
      res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
      data: deletedAnnouncement,
    });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
