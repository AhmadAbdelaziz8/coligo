// src/config/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coligo Student Dashboard API",
      version: "1.0.0",
      description:
        "A comprehensive REST API for the Student Dashboard application with JWT authentication and role-based access control. This API serves student announcements and quizzes with secure CRUD operations.",
      contact: {
        name: "API Support",
        email: "support@coligo.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5001",
        description: "Development server",
      },
      {
        url: "https://coligo-backend.vercel.app",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token in the format: Bearer <token>",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string", description: "User unique identifier" },
            name: { type: "string", description: "User full name" },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            role: {
              type: "string",
              enum: ["student", "admin"],
              description: "User role",
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Quiz: {
          type: "object",
          properties: {
            _id: { type: "string", description: "Quiz unique identifier" },
            title: { type: "string", description: "Quiz title" },
            course: { type: "string", description: "Course name" },
            topic: { type: "string", description: "Quiz topic" },
            dueDate: {
              type: "string",
              format: "date-time",
              description: "Quiz due date",
            },
            duration: {
              type: "number",
              description: "Quiz duration in minutes",
            },
            totalMarks: {
              type: "number",
              description: "Total marks for the quiz",
            },
            instructions: { type: "string", description: "Quiz instructions" },
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  questionText: { type: "string" },
                  options: { type: "array", items: { type: "string" } },
                  correctAnswer: { type: "number" },
                  points: { type: "number" },
                },
              },
            },
            isActive: { type: "boolean", description: "Quiz active status" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Announcement: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Announcement unique identifier",
            },
            title: { type: "string", description: "Announcement title" },
            content: { type: "string", description: "Announcement content" },
            instructor: { type: "string", description: "Instructor name" },
            instructorAvatar: {
              type: "string",
              description: "Instructor avatar URL",
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User email",
            },
            password: {
              type: "string",
              minLength: 8,
              description: "User password",
            },
          },
        },
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string", description: "User full name" },
            email: {
              type: "string",
              format: "email",
              description: "User email",
            },
            password: {
              type: "string",
              minLength: 8,
              description: "User password",
            },
            role: {
              type: "string",
              enum: ["student", "admin"],
              default: "student",
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            user: { $ref: "#/components/schemas/User" },
            token: { type: "string", description: "JWT access token" },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", default: false },
            message: { type: "string", description: "Error message" },
            error: {
              type: "string",
              description: "Detailed error information",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: { type: "boolean", default: true },
            message: { type: "string", description: "Success message" },
            data: { type: "object", description: "Response data" },
          },
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "User authentication endpoints",
      },
      {
        name: "Quizzes",
        description:
          "Quiz management endpoints (Students: Read-only, Admins: Full CRUD)",
      },
      {
        name: "Announcements",
        description:
          "Announcement management endpoints (Students: Read-only, Admins: Full CRUD)",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
