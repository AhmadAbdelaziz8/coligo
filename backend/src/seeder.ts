import mongoose from "mongoose";
import connectDB from "./config/db";
import { Quiz } from "./models/quiz.model";
import { Announcement } from "./models/announcement.model";
import { User } from "./models/user.model";
import { seedQuizzes, seedAnnouncements, seedUsers } from "./config/seedData";

const importData = async () => {
  try {
    await connectDB();

    await Quiz.deleteMany();
    await Announcement.deleteMany();
    await User.deleteMany();

    await Quiz.insertMany(seedQuizzes);
    await Announcement.insertMany(seedAnnouncements);
    await User.insertMany(seedUsers);

    console.log("Data Imported!");
    console.log("Test Users Created:");
    console.log(
      "🎓 Student - Email: student@coligo.com | Password: student123"
    );
    console.log("👨‍💼 Admin - Email: admin@coligo.com | Password: admin123");
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
    await User.deleteMany();

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
