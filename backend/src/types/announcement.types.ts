import { Document } from "mongoose";

export interface IAnnouncement {
  title: string;
  content: string;
  instructor: string;
  instructorAvatar?: string; // For profile pictures like in the UI
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnnouncementDocument extends IAnnouncement, Document {}
