import mongoose from "mongoose";
import { announcementSchema } from "../models/announcement.model";
import { IAnnouncementDocument } from "../types/announcement.types";

// Create the model with proper typing
const Announcement = mongoose.model<IAnnouncementDocument>(
  "Announcement",
  announcementSchema
);

// CREATE - Add new announcement
export const createAnnouncement = async (data: {
  title: string;
  content: string;
  instructor: string;
  instructorAvatar?: string;
}): Promise<IAnnouncementDocument> => {
  const announcement = new Announcement(data);
  return await announcement.save();
};

// READ - Get all announcements
export const getAllAnnouncements = async (): Promise<
  IAnnouncementDocument[]
> => {
  return await Announcement.find()
    .sort({ createdAt: -1 }) // Newest first
    .exec();
};

// READ - Get single announcement by ID
export const getAnnouncementById = async (
  id: string
): Promise<IAnnouncementDocument | null> => {
  return await Announcement.findById(id).exec();
};

// UPDATE - Update announcement
export const updateAnnouncement = async (
  id: string,
  data: Partial<{
    title: string;
    content: string;
    instructor: string;
    instructorAvatar: string;
  }>
): Promise<IAnnouncementDocument | null> => {
  return await Announcement.findByIdAndUpdate(id, data, {
    new: true, // Return updated document
    runValidators: true, // Run schema validation
  }).exec();
};

// DELETE - Remove announcement
export const deleteAnnouncement = async (
  id: string
): Promise<IAnnouncementDocument | null> => {
  return await Announcement.findByIdAndDelete(id).exec();
};
