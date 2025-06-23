import { Schema } from "mongoose";

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
