import { Router } from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     description: Create a new user account with email and password. Default role is 'student'.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           examples:
 *             student:
 *               summary: Register as Student
 *               value:
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 password: "password123"
 *                 role: "student"
 *             admin:
 *               summary: Register as Admin
 *               value:
 *                 name: "Admin User"
 *                 email: "admin@example.com"
 *                 password: "admin123"
 *                 role: "admin"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               user:
 *                 _id: "64a1b2c3d4e5f6789abc1234"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 role: "student"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_fields:
 *                 summary: Missing required fields
 *                 value:
 *                   success: false
 *                   message: "All fields are required"
 *               short_password:
 *                 summary: Password too short
 *                 value:
 *                   success: false
 *                   message: "Password must be at least 8 characters long"
 *       409:
 *         description: Conflict - User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "User already exists with this email"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/register", registerUserController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login user
 *     description: Authenticate user with email and password, returns JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             student_login:
 *               summary: Student Login
 *               value:
 *                 email: "john.doe@example.com"
 *                 password: "password123"
 *             admin_login:
 *               summary: Admin Login
 *               value:
 *                 email: "admin@example.com"
 *                 password: "admin123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               user:
 *                 _id: "64a1b2c3d4e5f6789abc1234"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 role: "student"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request - Missing credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Email and password are required"
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               user_not_found:
 *                 summary: User not found
 *                 value:
 *                   success: false
 *                   message: "User not found"
 *               invalid_password:
 *                 summary: Invalid password
 *                 value:
 *                   success: false
 *                   message: "Invalid credentials"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", loginUserController);

export default router;
