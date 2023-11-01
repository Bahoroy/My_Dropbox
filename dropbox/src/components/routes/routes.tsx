// RoutesComponent.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../register/Register";
import Login from "../register/Login";
import UploadFile from "../main/UploadFile";
import { User } from "firebase/auth";
import Home from "../../Home";

const ProtectedRoute: React.FC<{
  element: React.ReactElement;
  user: User | null;
}> = ({ element, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
 
  return element;
};

const RoutesComponent: React.FC<{ user: User | null; auth: any }> = ({
  user,
  auth,
}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? (
            <ProtectedRoute element={<Home user={user} />} user={user} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/upload"
        element={
          user ? (
            <ProtectedRoute element={<UploadFile user={user} />} user={user} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login auth={auth} />} />
      <Route path="/register" element={<Register auth={auth} />} />
    </Routes>
  );
};

export default RoutesComponent;
