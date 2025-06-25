import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { IUser, IUserSafe } from "../types/user.types";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role?: "student" | "admin";
}): Promise<{ user: IUserSafe; token: string }> => {
  const { name, email, password, role = "student" } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // Create user
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role,
  });

  // return the user without the password
  const userWithoutPassword: IUserSafe = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET not configured");
  }

  // Generate token
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: "7d" }
  );

  return { user: userWithoutPassword, token };
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<{ user: IUserSafe; token: string }> => {
  const { email, password } = credentials;

  // Find user
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new Error("User not found");
  }

  // Validate password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid credentials");
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET not configured");
  }

  // Generate token
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: "7d" }
  );

  const userSafe: IUserSafe = {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return {
    user: userSafe,
    token,
  };
};
