import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
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

dotenv.config();
const app = express();

// universal middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// public authentication route
app.use("/api/auth", authRoute);

// protected routes
app.use("/api/quizzes", authMiddleware, quizRoute);
app.use("/api/announcements", authMiddleware, announcementRoute);

// connection to the database
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
