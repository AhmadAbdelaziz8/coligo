import { Schema, model } from "mongoose";
import { IAnnouncementDocument } from "../types/announcement.types";

export const announcementSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxlength: [2000, "Content cannot exceed 2000 characters"],
    },
    instructor: {
      type: String,
      required: [true, "Instructor is required"],
      trim: true,
    },
    instructorAvatar: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Announcement = model<IAnnouncementDocument>(
  "Announcement",
  announcementSchema
);
