import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home"); // Redirect to '/home' when authenticated
    } else {
      loginWithRedirect({ redirectUri: "http://localhost:5173/home" });
    }
  }, [loginWithRedirect, isAuthenticated, navigate]);

  // Content to display while redirection logic is processed
  return (
    <div>
      {isAuthenticated ? (
        <div>Redirecting to home...</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LandingPage;
