import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { IUser, IUserSafe, IUserDocument } from "../types/user.types";

// Helper function to generate JWT token
const generateToken = (user: {
  _id: any;
  email: string;
  role: string;
}): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET not configured");
  }

  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role,
    },
    jwtSecret,
    { expiresIn: "7d" }
  );
};

// Helper function to convert user to safe format
const toUserSafe = (user: IUserDocument): IUserSafe => ({
  _id: (user._id as any).toString(),
  name: user.name,
  email: user.email,
  role: user.role,
});

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

  // Generate token and return safe user data
  const token = generateToken(user);
  const userSafe = toUserSafe(user);

  return { user: userSafe, token };
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

  // Generate token and return safe user data
  const token = generateToken(user);
  const userSafe = toUserSafe(user);

  return { user: userSafe, token };
};
