import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Auth0ProviderWithHistory from "../auth/Auth0ProviderWithHistory";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/Home";
import InventoryPage from "./pages/Inventory";
import RecommendationsPage from "./pages/Recommendations";
import NewsPage from "./pages/News";
import Profile from "./pages/Profile";
import LandingPage from "./pages/LandingPage";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import AdminPage from "./pages/Admin";

function Auth0ProviderWrapper({ children }) {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0ProviderWithHistory onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0ProviderWithHistory>
  );
}

function App() {
  const { user, isAuthenticated } = useAuth0();
  const namespace = "https://myapp.example.com/";
  const isAdmin = user && user[namespace + "user_role"] === "Admin";

  return (
    <>
      <Router>
        {/* Navigation Bar */}
        <Auth0ProviderWrapper>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/user" element={<Profile />} />
            {/*{isAdmin && <Route path="/admin" element={<AdminPage />} />} */}
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Auth0ProviderWrapper>
      </Router>
    </>
  );
}

export default App;
