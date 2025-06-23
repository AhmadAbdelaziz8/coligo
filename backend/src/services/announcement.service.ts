import mongoose from "mongoose";
import { announcementSchema } from "../models/announcement.model";
import { IAnnouncementDocument } from "../types/announcement.types";

// Create the model with proper typing
const Announcement = mongoose.model<IAnnouncementDocument>(
  "Announcement",
  announcementSchema
);

export const createAnnouncement = async (data: {
  title: string;
  content: string;
  instructor: string;
  instructorAvatar?: string;
}): Promise<IAnnouncementDocument> => {
  const announcement = new Announcement(data);
  return await announcement.save();
};

export const getAllAnnouncements = async (): Promise<
  IAnnouncementDocument[]
> => {
  return await Announcement.find()
    .sort({ createdAt: -1 }) // Newest first
    .exec();
};

export const getAnnouncementById = async (
  id: string
): Promise<IAnnouncementDocument | null> => {
  return await Announcement.findById(id).exec();
};

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
    new: true,
    runValidators: true,
  }).exec();
};

export const deleteAnnouncement = async (
  id: string
): Promise<IAnnouncementDocument | null> => {
  return await Announcement.findByIdAndDelete(id).exec();
};
