import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { store } from "./store/store";
import { useAppSelector, useAppDispatch } from "./hooks/redux";
import { restoreAuth } from "./store/slices/authSlice";
import "./i18n/i18n";

// Layouts
import DashboardLayout from "./components/Layout/DashboardLayout";
import AdminLayout from "./components/Layout/AdminLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import CoursesPage from "./pages/CoursesPage";
import SchedulePage from "./pages/SchedulePage";
import GradebookPage from "./pages/GradebookPage";
import PerformancePage from "./pages/PerformancePage";

// Admin Pages
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import QuizzesManagementPage from "./pages/Admin/QuizzesManagementPage";
import AnnouncementsManagementPage from "./pages/Admin/AnnouncementsManagementPage";

// API Documentation
import ApiDocsPage from "./pages/ApiDocsPage";

// Quiz Pages
import QuizzesListPage from "./pages/QuizzesListPage";
import QuizTakingPage from "./pages/QuizTakingPage";

// Components
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

// Admin Route Protection Component
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Restore authentication state on app startup
    dispatch(restoreAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/auth" element={<Navigate to="/login" replace />} />
        <Route path="/api-docs" element={<ApiDocsPage />} />

        {/* Student Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="gradebook" element={<GradebookPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="quizzes" element={<QuizzesListPage />} />
          <Route path="quiz/:quizId" element={<QuizTakingPage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="quizzes" element={<QuizzesManagementPage />} />
          <Route
            path="announcements"
            element={<AnnouncementsManagementPage />}
          />
          <Route
            path="students"
            element={<div>Students Management (Coming Soon)</div>}
          />
          <Route
            path="courses"
            element={<div>Courses Management (Coming Soon)</div>}
          />
          <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
