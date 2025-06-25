import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAppSelector } from "./hooks/redux";
import DashboardLayout from "./components/Layout/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SchedulePage from "./pages/SchedulePage";
import CoursesPage from "./pages/CoursesPage";
import GradebookPage from "./pages/GradebookPage";
import PerformancePage from "./pages/PerformancePage";
import QuizzesPage from "./pages/QuizzesPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import QuizAttemptPage from "./pages/QuizAttemptPage";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Box className="min-h-screen">
      <Routes>
        {/* Landing Page*/}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />
          }
        />

        {/* Public Auth Routes */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <RegisterPage /> : <Navigate to="/dashboard" />
          }
        />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="gradebook" element={<GradebookPage />} />
            <Route path="performance" element={<PerformancePage />} />
            <Route path="quizzes" element={<QuizzesPage />} />
            <Route path="quizzes/:id" element={<QuizAttemptPage />} />
            <Route path="announcements" element={<AnnouncementsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  );
}

export default App;
