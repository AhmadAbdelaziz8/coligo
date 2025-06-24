import {
  getQuizByIdController,
  getAllQuizzesController,
  createNewQuizController,
  deleteQuizController,
  updateQuizController,
} from "../controllers/quiz.controller";
import { Router } from "express";
import { adminMiddleware } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     tags: [Quizzes]
 *     summary: Create a new quiz (Admin only)
 *     description: Create a new quiz with questions. Only admins can create quizzes.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, course, topic, dueDate, duration, totalMarks, questions]
 *             properties:
 *               title:
 *                 type: string
 *                 description: Quiz title
 *                 example: "Introduction to JavaScript"
 *               course:
 *                 type: string
 *                 description: Course name
 *                 example: "Web Development"
 *               topic:
 *                 type: string
 *                 description: Quiz topic
 *                 example: "JavaScript Basics"
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Quiz due date
 *                 example: "2024-12-25T23:59:59.000Z"
 *               duration:
 *                 type: number
 *                 description: Quiz duration in minutes
 *                 example: 30
 *               totalMarks:
 *                 type: number
 *                 description: Total marks for the quiz
 *                 example: 100
 *               instructions:
 *                 type: string
 *                 description: Quiz instructions
 *                 example: "Answer all questions carefully"
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionText:
 *                       type: string
 *                       example: "What is JavaScript?"
 *                     options:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["A programming language", "A markup language", "A database", "An operating system"]
 *                     correctAnswer:
 *                       type: number
 *                       example: 0
 *                     points:
 *                       type: number
 *                       example: 10
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Admin access required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", adminMiddleware, createNewQuizController);

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     tags: [Quizzes]
 *     summary: Get all active quizzes
 *     description: Retrieve all active quizzes. Available to both students and admins.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of active quizzes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quiz'
 *             example:
 *               - _id: "64a1b2c3d4e5f6789abc1234"
 *                 title: "Introduction to JavaScript"
 *                 course: "Web Development"
 *                 topic: "JavaScript Basics"
 *                 dueDate: "2024-12-25T23:59:59.000Z"
 *                 duration: 30
 *                 totalMarks: 100
 *                 isActive: true
 *                 createdAt: "2024-01-15T10:00:00.000Z"
 *       401:
 *         description: Unauthorized - No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No quizzes found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "No quizzes found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getAllQuizzesController);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     tags: [Quizzes]
 *     summary: Get quiz by ID
 *     description: Retrieve a specific quiz by its ID. Available to both students and admins.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz unique identifier
 *         example: "64a1b2c3d4e5f6789abc1234"
 *     responses:
 *       200:
 *         description: Quiz retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quiz'
 *       401:
 *         description: Unauthorized - No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Quiz not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Quiz not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getQuizByIdController);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   put:
 *     tags: [Quizzes]
 *     summary: Update quiz (Admin only)
 *     description: Update an existing quiz. Only admins can update quizzes.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz unique identifier
 *         example: "64a1b2c3d4e5f6789abc1234"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Quiz title
 *               course:
 *                 type: string
 *                 description: Course name
 *               topic:
 *                 type: string
 *                 description: Quiz topic
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: Quiz due date
 *               duration:
 *                 type: number
 *                 description: Quiz duration in minutes
 *               totalMarks:
 *                 type: number
 *                 description: Total marks
 *               instructions:
 *                 type: string
 *                 description: Quiz instructions
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *               isActive:
 *                 type: boolean
 *                 description: Quiz active status
 *             example:
 *               title: "Advanced JavaScript Concepts"
 *               course: "Web Development"
 *               topic: "Advanced JavaScript"
 *               dueDate: "2024-12-30T23:59:59.000Z"
 *               duration: 45
 *               totalMarks: 150
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *             example:
 *               success: true
 *               message: "Quiz updated successfully"
 *               data:
 *                 _id: "64a1b2c3d4e5f6789abc1234"
 *                 title: "Advanced JavaScript Concepts"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Quiz not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", adminMiddleware, updateQuizController);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   delete:
 *     tags: [Quizzes]
 *     summary: Delete quiz (Admin only)
 *     description: Soft delete a quiz by marking it as inactive. Only admins can delete quizzes.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Quiz unique identifier
 *         example: "64a1b2c3d4e5f6789abc1234"
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *             example:
 *               success: true
 *               message: "Quiz deleted successfully"
 *       401:
 *         description: Unauthorized - No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Quiz not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Quiz not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", adminMiddleware, deleteQuizController);

export default router;
