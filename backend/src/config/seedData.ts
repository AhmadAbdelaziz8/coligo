function getFutureDate(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export const seedQuizzes = [
  {
    title: "JavaScript Fundamentals",
    course: "Web Development 101",
    topic: "JS Basics",
    dueDate: getFutureDate(7),
    duration: 30,
    totalMarks: 50,
    instructions:
      "Answer all questions. This quiz covers variables, data types, and functions.",
    questions: [
      {
        questionText:
          "Which keyword is used to declare a variable that cannot be reassigned?",
        options: ["var", "let", "const", "static"],
        correctAnswer: 2,
        points: 10,
      },
      {
        questionText: "What is the output of `typeof null`?",
        options: ["null", "undefined", "object", "string"],
        correctAnswer: 2,
        points: 10,
      },
      {
        questionText: "Which function is used to print content to the console?",
        options: [
          "console.print()",
          "console.write()",
          "console.log()",
          "print()",
        ],
        correctAnswer: 2,
        points: 10,
      },
      {
        questionText: "What does `2 + '2'` evaluate to in JavaScript?",
        options: ["4", "22", "Error", "NaN"],
        correctAnswer: 1,
        points: 10,
      },
      {
        questionText: "How do you write a single-line comment in JavaScript?",
        options: [
          "// comment",
          "/* comment */",
          "<!-- comment -->",
          "# comment",
        ],
        correctAnswer: 0,
        points: 10,
      },
    ],
    isActive: true,
  },
  {
    title: "Introduction to React",
    course: "Advanced Web Development",
    topic: "React",
    dueDate: getFutureDate(12),
    duration: 45,
    totalMarks: 60,
    instructions: "This quiz covers JSX, components, props, and state.",
    questions: [
      {
        questionText: "What is JSX?",
        options: [
          "JavaScript XML",
          "JavaScript Extension",
          "Java Syntax Extension",
          "JSON Syntax",
        ],
        correctAnswer: 0,
        points: 15,
      },
      {
        questionText:
          "Which method is used to pass data to a component from outside?",
        options: ["state", "props", "render", "setState"],
        correctAnswer: 1,
        points: 15,
      },
      {
        questionText: "What is the correct way to create a React component?",
        options: [
          "function MyComponent() {}",
          "class MyComponent extends React.Component {}",
          "Both A and B",
          "None of the above",
        ],
        correctAnswer: 2,
        points: 15,
      },
      {
        questionText:
          "Which hook is used for managing state in a functional component?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctAnswer: 1,
        points: 15,
      },
    ],
    isActive: true,
  },
  {
    title: "Node.js and Express Basics",
    course: "Backend Development",
    topic: "Node.js",
    dueDate: getFutureDate(20),
    duration: 60,
    totalMarks: 100,
    instructions:
      "This quiz assesses your understanding of Node.js modules, Express routing, and middleware.",
    questions: [
      {
        questionText: "What is Node.js?",
        options: [
          "A frontend framework",
          "A JavaScript runtime environment",
          "A database",
          "A CSS preprocessor",
        ],
        correctAnswer: 1,
        points: 20,
      },
      {
        questionText:
          "Which object is used to handle the HTTP request in Express?",
        options: ["req", "res", "next", "app"],
        correctAnswer: 0,
        points: 20,
      },
      {
        questionText: "What is middleware in Express?",
        options: [
          "A function that has access to the req/res objects",
          "A routing method",
          "A template engine",
          "A database connector",
        ],
        correctAnswer: 0,
        points: 20,
      },
      {
        questionText: "How do you install Express in your project?",
        options: [
          "npm get express",
          "npm install express",
          "npm add express",
          "node install express",
        ],
        correctAnswer: 1,
        points: 20,
      },
      {
        questionText: "Which of these is a core module in Node.js?",
        options: ["http", "express", "react", "fs"],
        correctAnswer: 3,
        points: 20,
      },
    ],
    isActive: true,
  },
  {
    title: "Introduction to MongoDB",
    course: "Database Management",
    topic: "MongoDB",
    dueDate: getFutureDate(30),
    duration: 40,
    totalMarks: 80,
    instructions:
      "This quiz covers basic MongoDB concepts, documents, and collections.",
    questions: [
      {
        questionText: "MongoDB is a type of what database?",
        options: ["SQL", "NoSQL", "Relational", "Graph"],
        correctAnswer: 1,
        points: 20,
      },
      {
        questionText:
          "In MongoDB, a collection is equivalent to what in a relational database?",
        options: ["A row", "A table", "A column", "A schema"],
        correctAnswer: 1,
        points: 20,
      },
      {
        questionText: "What format are documents stored in within MongoDB?",
        options: ["XML", "JSON", "BSON", "YAML"],
        correctAnswer: 2,
        points: 20,
      },
      {
        questionText:
          "Which command is used to find all documents in a collection?",
        options: [
          "db.collection.find()",
          "db.collection.findAll()",
          "db.collection.get()",
          "db.collection.query()",
        ],
        correctAnswer: 0,
        points: 20,
      },
    ],
    isActive: true,
  },
];

export const seedAnnouncements = [
  {
    title: "Welcome to the Fall Semester!",
    content:
      "We're excited to have you back. Please review the updated course syllabus and schedule. Let's make it a great semester!",
    instructor: "Dr. Evelyn Reed",
  },
  {
    title: "Library Hours Extended for Midterms",
    content:
      "The main library will be open 24/7 starting next week to help you prepare for your midterm exams. Good luck with your studies!",
    instructor: "Campus Administration",
  },
  {
    title: "Upcoming Workshop: State Management with Redux",
    content:
      "Join us for a hands-on workshop covering the fundamentals of Redux Toolkit this Friday at 2 PM in Room 301. Laptops are required.",
    instructor: "Prof. David Chen",
  },
  {
    title: "Career Fair Next Wednesday",
    content:
      "Don't miss the annual career fair! Over 50 companies will be on campus. Bring your resume and dress professionally. Check the events page for more details.",
    instructor: "Career Services",
  },
  {
    title: "Reminder: Course Registration Deadline",
    content:
      "The deadline to add or drop courses for this semester is this Friday, September 10th, at 5:00 PM. Please finalize your schedules.",
    instructor: "Registrar's Office",
  },
];

export const seedUsers = [
  {
    name: "Student User",
    email: "student@coligo.com",
    password: "student123",
    role: "student",
    profilePicture:
      "https://ui-avatars.com/api/?name=Student+User&background=4f46e5&color=fff",
  },
  {
    name: "Admin User",
    email: "admin@coligo.com",
    password: "admin123",
    role: "admin",
    profilePicture:
      "https://ui-avatars.com/api/?name=Admin+User&background=dc2626&color=fff",
  },
];
