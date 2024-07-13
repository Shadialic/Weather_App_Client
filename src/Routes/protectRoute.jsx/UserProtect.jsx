import { Navigate } from "react-router-dom";
import React from "react";

function UserProtect({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default UserProtect;
