import { Schema } from "mongoose";

const AnswerSchema = new Schema({
  questionIndex: {
    type: Number,
    required: [true, "Question index is required"],
    min: [0, "Question index must be >= 0"],
  },
  selectedOption: {
    type: Number,
    required: [true, "Selected option is required"],
    min: [0, "Selected option must be >= 0"],
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  pointsEarned: {
    type: Number,
    required: true,
    min: [0, "Points earned must be >= 0"],
  },
});

export const QuizAttemptSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    quizId: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: [true, "Quiz ID is required"],
    },
    attemptNumber: {
      type: Number,
      required: [true, "Attempt number is required"],
      min: [1, "Attempt number must be >= 1"],
    },
    answers: [AnswerSchema],
    totalScore: {
      type: Number,
      required: true,
      min: [0, "Total score must be >= 0"],
      default: 0,
    },
    totalPossible: {
      type: Number,
      required: true,
      min: [1, "Total possible must be >= 1"],
    },
    percentage: {
      type: Number,
      required: true,
      min: [0, "Percentage must be >= 0"],
      max: [100, "Percentage must be <= 100"],
      default: 0,
    },
    startTime: {
      type: Date,
      required: [true, "Start time is required"],
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0,
      min: [0, "Time spent must be >= 0"],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

