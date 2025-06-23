import mongoose from "mongoose";
import { UserSchema } from "../models/user.model";
import { IUserDocument } from "../types/user.types";

// Create the model with proper typing
const User = mongoose.model<IUserDocument>("User", UserSchema);

// CREATE - Register new user
export const createUser = async (data: {
  name: string;
  email: string;
  passwordHash: string;
  role?: "student" | "admin";
  profilePicture?: string;
}): Promise<IUserDocument> => {
  const user = new User(data);
  return await user.save();
};

// READ - Get all users
export const getAllUsers = async (): Promise<IUserDocument[]> => {
  return await User.find()
    .select("-passwordHash") // Never return password hashes
    .sort({ createdAt: -1 })
    .exec();
};

// READ - Get user by email (for login)
export const getUserByEmail = async (
  email: string
): Promise<IUserDocument | null> => {
  return await User.findOne({ email }).exec();
};

// READ - Get user by ID
export const getUserById = async (
  id: string
): Promise<IUserDocument | null> => {
  return await User.findById(id)
    .select("-passwordHash") // Don't return password hash
    .exec();
};

// READ - Get students only
export const getAllStudents = async (): Promise<IUserDocument[]> => {
  return await User.find({ role: "student" })
    .select("-passwordHash")
    .sort({ name: 1 })
    .exec();
};

// UPDATE - Update user profile
export const updateUser = async (
  id: string,
  data: Partial<{
    name: string;
    email: string;
    profilePicture: string;
  }>
): Promise<IUserDocument | null> => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  })
    .select("-passwordHash")
    .exec();
};

// UPDATE - Change password (separate function for security)
export const updatePassword = async (
  id: string,
  newPasswordHash: string
): Promise<boolean> => {
  const result = await User.findByIdAndUpdate(id, {
    passwordHash: newPasswordHash,
  }).exec();
  return !!result;
};

// DELETE - Remove user permanently
export const deleteUser = async (id: string): Promise<IUserDocument | null> => {
  return await User.findByIdAndDelete(id).select("-passwordHash").exec();
};

// UTILITY - Check if email exists
export const emailExists = async (email: string): Promise<boolean> => {
  const user = await User.findOne({ email }).exec();
  return !!user;
};
