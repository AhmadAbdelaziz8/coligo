import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";

// register user controller
export const registerUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData = req.body;
    // validation of fields
    if (!userData.name || !userData.email || !userData.password) {
      res.status(400).json({ message: "All fields are required" });
    }
    if (userData.password.length < 8) {
      res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    // register the user
    const user = await registerUser(userData);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// login user controller
export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const credentials = req.body;
    // validation of fields
    if (!credentials.email || !credentials.password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    // login the user
    const { user, token } = await loginUser(credentials);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};
