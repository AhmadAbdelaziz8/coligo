import { Schema } from "mongoose";

const QuestionSchema = new Schema({
  questionText: {
    type: String,
    required: [true, "Question text is required"],
    trim: true,
  },
  options: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  correctAnswer: {
    type: Number,
    required: [true, "Correct answer index is required"],
    min: [0, "Correct answer index must be >= 0"],
  },
  points: {
    type: Number,
    required: [true, "Points are required"],
    min: [1, "Points must be at least 1"],
  },
});

export const QuizSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: function (value: Date) {
          return value > new Date();
        },
        message: "Due date must be in the future",
      },
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
      min: [5, "Duration must be at least 5 minutes"],
      max: [300, "Duration cannot exceed 300 minutes"],
    },
    totalMarks: {
      type: Number,
      required: [true, "Total marks are required"],
      min: [1, "Total marks must be at least 1"],
    },
    instructions: {
      type: String,
      trim: true,
      maxlength: [1000, "Instructions cannot exceed 1000 characters"],
    },
    questions: [QuestionSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
