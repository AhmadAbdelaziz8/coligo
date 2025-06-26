import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db";
// swagger for documentation
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
// import routes
import quizRoute from "./routes/quiz.route";
import announcementRoute from "./routes/announcement.route";
import authRoute from "./routes/auth.route";
// middleware
import { authMiddleware } from "./middleware/auth.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";
// seeding
import { Quiz } from "./models/quiz.model";
import { Announcement } from "./models/announcement.model";
import { seedQuizzes, seedAnnouncements } from "./config/seedData";

dotenv.config();
const app = express();

// universal middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    message: "API is running!",
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      hasMongoUri: !!process.env.MONGO_URI,
      hasJwtSecret: !!process.env.JWT_SECRET,
    },
  });
});

// swagger documentation with CDN assets
const swaggerHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Coligo API Documentation</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.0.1/swagger-ui.css" />
  <style>
    .swagger-ui .topbar { display: none !important; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.0.1/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@5.0.1/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: window.location.origin + '/api-docs/swagger.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: "StandaloneLayout",
        persistAuthorization: true
      });
    };
  </script>
</body>
</html>
`;

// Serve the Swagger spec as JSON
app.get("/api-docs/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Serve custom Swagger UI HTML
app.get("/api-docs", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(swaggerHtml);
});

// Seed endpoint for initial data population
app.post("/api/seed", async (req, res) => {
  try {
    if (!process.env.MONGO_URI) {
      return res
        .status(500)
        .json({ error: "MONGO_URI environment variable not set" });
    }

    // Check if database is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: "Database not connected" });
    }

    // Clear existing data
    await Quiz.deleteMany();
    await Announcement.deleteMany();

    // Insert seed data
    await Quiz.insertMany(seedQuizzes);
    await Announcement.insertMany(seedAnnouncements);

    res.json({
      message: "Database seeded successfully!",
      data: {
        quizzes: seedQuizzes.length,
        announcements: seedAnnouncements.length,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    res.status(500).json({
      error: "Failed to seed database",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// public authentication route
app.use("/api/auth", authRoute);

// protected routes
app.use("/api/quizzes", authMiddleware, quizRoute);
app.use("/api/announcements", authMiddleware, announcementRoute);

// Initialize database connection
const initializeDatabase = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
};

// Initialize database connection
initializeDatabase();

const PORT = process.env.PORT || 3000;

// Only start the server in development (not on Vercel)
if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the Express app for Vercel
export default app;
