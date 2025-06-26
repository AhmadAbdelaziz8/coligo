import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

// register user controller
export const registerUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData = req.body;

    // validation of fields
    if (!userData.name || !userData.email || !userData.password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    if (userData.password.length < 8) {
      res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
      return;
    }

    // register the user
    const { user, token } = await registerUser(userData);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "User already exists with this email"
    ) {
      res.status(409).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

// login user controller
export const loginUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const credentials = req.body;

    // validation of fields
    if (!credentials.email || !credentials.password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    // login the user
    const { user, token } = await loginUser(credentials);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "User not found" ||
        error.message === "Invalid credentials")
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};
