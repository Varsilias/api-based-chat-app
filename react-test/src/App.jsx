import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import ChatWindow from "./components/ChatWindow";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./components/Users";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route
        exact
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatWindow />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
