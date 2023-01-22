import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";

import { UserContext } from "../../../UserContext";

import { logout } from "../../../services/auth";

const reloadPage = () => window.location.reload();

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div style={{ width: "100%" }}>
      <Typography component="h2" variant="h4" style={{ marginBottom: 10 }}>
        Profile
      </Typography>
      <Typography component="h3" variant="h5" style={{ marginTop: 5 }}>
        <strong>Name</strong>: {user.name}
      </Typography>
      <Typography component="h3" variant="h5" style={{ marginTop: 5 }}>
        <strong>Email</strong>: {user.email}
      </Typography>
      <Typography component="h3" variant="h5" style={{ marginTop: 5 }}>
        <strong>Phone</strong>: {user.phone}
      </Typography>
      <Typography component="h3" variant="h5" style={{ marginTop: 5 }}>
        <strong>Region</strong>: {user.region}
      </Typography>
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={() => {
          logout();
          navigate("/");
          reloadPage();
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Profile;
