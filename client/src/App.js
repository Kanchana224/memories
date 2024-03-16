import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("profile");
    // Update state to reflect user being logged out
    setIsLoggedIn(false);
  };

  // Check if the user is logged in
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Auth />}
          />
          <Route path="/posts" element={user ? <Home /> : <Auth />} />
          <Route path="/posts/search" element={user ? <Home /> : <Auth />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
