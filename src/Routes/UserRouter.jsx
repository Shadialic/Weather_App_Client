import React from "react";
import { Route, Routes } from "react-router-dom";
import UserPublic from "./protectRoute.jsx/UserPublic";
import LoginPage from "../pages/Layouts/LoginPage/LoginPage";
import SignupPage from "../pages/Layouts/SignupPage/SignupPage";
import HomePage from "../pages/Home/HomePage";
import UserProtect from "./protectRoute.jsx/UserProtect";

function UserRouter() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <UserPublic>
              <LoginPage />{" "}
            </UserPublic>
          }
        />
        <Route
          path="/signup"
          element={
            <UserPublic>
              <SignupPage />
            </UserPublic>
          }
        />
        <Route
          path="/*"
          element={
            <UserProtect>
              <HomePage />{" "}
            </UserProtect>
          }
        />
      </Routes>
    </>
  );
}

export default UserRouter;
