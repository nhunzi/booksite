import React from "react";
import { Paper, Typography, Avatar } from "@mui/material";
import Navbar from "../components/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
  const { user } = useAuth0();

  console.log("User Object:", user);
  if (!user) {
    return <div>Loading ...</div>;
  } else {
    return (
      <div>
        <Navbar />
        <Paper elevation={3} style={{ padding: "16px" }}>
          <Typography variant="h4">{user.nickname}</Typography>
          <Avatar
            src={user.picture}
            alt={user.name}
            style={{ width: "100px", height: "100px" }}
          />
          <Typography>Email: {user.email}</Typography>
          <Typography>
            Email Verified: {user.email_verified ? "Yes" : "No"}
          </Typography>
          <Typography>Last Updated: {user.updated_at}</Typography>
        </Paper>
      </div>
    );
  }
};

export default UserProfile;
