import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CourseList from "./pages/CourseList";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/courses"
        element={
          <PrivateRoute>
            <CourseList />
          </PrivateRoute>
        }
      />
      <Route
        path="/courses/add"
        element={
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        }
      />
      <Route
        path="/courses/edit/:id"
        element={
          <PrivateRoute>
            <EditCourse />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;
