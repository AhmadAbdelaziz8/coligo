export interface Announcement {
  _id: string;
  title: string;
  content: string;
  course: string;
  priority: "low" | "medium" | "high";
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnnouncementData {
  title: string;
  content: string;
  course: string;
  priority: "low" | "medium" | "high";
}
