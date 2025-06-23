import { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: "student" | "admin";
  profilePicture?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}
