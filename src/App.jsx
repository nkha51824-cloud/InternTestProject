import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import CourseList from "./pages/courses/CourseList.jsx";
import AddCourses from "./pages/courses/AddCourses.jsx";
import EditCourses from "./pages/courses/EditCourses.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AppLayout from "./components/AppLayout.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <CourseList />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/add"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AddCourses />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses/edit/:id"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <EditCourses />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
