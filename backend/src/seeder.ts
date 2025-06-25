import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db";
import { Quiz } from "./models/quiz.model";
import { Announcement } from "./models/announcement.model";
import { seedQuizzes, seedAnnouncements } from "./config/seedData";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await Quiz.deleteMany();
    await Announcement.deleteMany();

    await Quiz.insertMany(seedQuizzes);
    await Announcement.insertMany(seedAnnouncements);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Quiz.deleteMany();
    await Announcement.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
