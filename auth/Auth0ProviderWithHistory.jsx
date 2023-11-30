// src/auth/Auth0ProviderWithHistory.jsx
import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children, onRedirectCallback }) => {
  const domain = "dev-33u4j6uatgh4605h.us.auth0.com";
  const clientId = "UYfwKeg4rBY1u2FcekTFSU2XQL6Fh26U";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={"http://localhost:5173/home"}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
