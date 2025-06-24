import { Router } from "express";

import {
  createAnnouncementController,
  getAnnouncementByIdController,
  getAllAnnouncementsController,
  updateAnnouncementController,
  deleteAnnouncementController,
} from "../controllers/announcement.controller";
import { adminMiddleware } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/announcements:
 *   post:
 *     tags: [Announcements]
 *     summary: Create a new announcement (Admin only)
 *     description: Create a new announcement. Only admins can create announcements.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content, instructor]
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 200
 *                 description: Announcement title
 *                 example: "New Course Available: Advanced React"
 *               content:
 *                 type: string
 *                 maxLength: 2000
 *                 description: Announcement content
 *                 example: "We are excited to announce our new Advanced React course starting next month. This course covers hooks, context API, and performance optimization."
 *               instructor:
 *                 type: string
 *                 description: Instructor name
 *                 example: "Dr. Sarah Johnson"
 *               instructorAvatar:
 *                 type: string
 *                 description: Instructor avatar URL
 *                 example: "https://example.com/avatars/sarah.jpg"
 *           examples:
 *             course_announcement:
 *               summary: Course Announcement
 *               value:
 *                 title: "New Course Available: Advanced React"
 *                 content: "We are excited to announce our new Advanced React course starting next month."
 *                 instructor: "Dr. Sarah Johnson"
 *                 instructorAvatar: "https://example.com/avatars/sarah.jpg"
 *             exam_announcement:
 *               summary: Exam Announcement
 *               value:
 *                 title: "Midterm Exam Schedule"
 *                 content: "The midterm exams will be held from December 15-20. Please check your individual schedules."
 *                 instructor: "Prof. Michael Brown"
 *     responses:
 *       201:
 *         description: Announcement created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Announcement created successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Announcement'
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
 *                   message: "Title, content, and instructor are required"
 *               title_too_long:
 *                 summary: Title too long
 *                 value:
 *                   success: false
 *                   message: "Title cannot exceed 200 characters"
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
router.post("/", adminMiddleware, createAnnouncementController);

/**
 * @swagger
 * /api/announcements:
 *   get:
 *     tags: [Announcements]
 *     summary: Get all announcements
 *     description: Retrieve all announcements sorted by creation date (newest first). Available to both students and admins.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of announcements retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Announcements retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Announcement'
 *             example:
 *               success: true
 *               message: "Announcements retrieved successfully"
 *               data:
 *                 - _id: "64a1b2c3d4e5f6789abc1234"
 *                   title: "New Course Available: Advanced React"
 *                   content: "We are excited to announce our new Advanced React course."
 *                   instructor: "Dr. Sarah Johnson"
 *                   instructorAvatar: "https://example.com/avatars/sarah.jpg"
 *                   createdAt: "2024-01-15T10:00:00.000Z"
 *                   updatedAt: "2024-01-15T10:00:00.000Z"
 *       401:
 *         description: Unauthorized - No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No announcements found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "No announcements found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", getAllAnnouncementsController);

/**
 * @swagger
 * /api/announcements/{id}:
 *   get:
 *     tags: [Announcements]
 *     summary: Get announcement by ID
 *     description: Retrieve a specific announcement by its ID. Available to both students and admins.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement unique identifier
 *         example: "64a1b2c3d4e5f6789abc1234"
 *     responses:
 *       200:
 *         description: Announcement retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Announcement retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Announcement'
 *       401:
 *         description: Unauthorized - No token provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Announcement not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Announcement not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", getAnnouncementByIdController);

/**
 * @swagger
 * /api/announcements/{id}:
 *   put:
 *     tags: [Announcements]
 *     summary: Update announcement (Admin only)
 *     description: Update an existing announcement. Only admins can update announcements.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement unique identifier
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
 *                 maxLength: 200
 *                 description: Announcement title
 *               content:
 *                 type: string
 *                 maxLength: 2000
 *                 description: Announcement content
 *               instructor:
 *                 type: string
 *                 description: Instructor name
 *               instructorAvatar:
 *                 type: string
 *                 description: Instructor avatar URL
 *             example:
 *               title: "Updated: Advanced React Course Details"
 *               content: "The Advanced React course has been updated with new modules on Next.js and Server Components."
 *               instructor: "Dr. Sarah Johnson"
 *               instructorAvatar: "https://example.com/avatars/sarah-updated.jpg"
 *     responses:
 *       200:
 *         description: Announcement updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Announcement updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Announcement'
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
 *         description: Announcement not found
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
router.put("/:id", adminMiddleware, updateAnnouncementController);

/**
 * @swagger
 * /api/announcements/{id}:
 *   delete:
 *     tags: [Announcements]
 *     summary: Delete announcement (Admin only)
 *     description: Permanently delete an announcement. Only admins can delete announcements.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement unique identifier
 *         example: "64a1b2c3d4e5f6789abc1234"
 *     responses:
 *       200:
 *         description: Announcement deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Announcement deleted successfully"
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
 *         description: Announcement not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Announcement not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", adminMiddleware, deleteAnnouncementController);

export default router;
