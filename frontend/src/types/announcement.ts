export interface Announcement {
  _id: string;
  title: string;
  content: string;
  instructor: string;
  instructorAvatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnnouncementData {
  title: string;
  content: string;
  instructor: string;
}
