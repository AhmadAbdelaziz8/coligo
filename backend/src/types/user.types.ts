import { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "student" | "admin";
  profilePicture?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserSafe {
  _id: string;
  name: string;
  email: string;
  role: "student" | "admin";
}
export interface IUserDocument extends IUser, Document {}
