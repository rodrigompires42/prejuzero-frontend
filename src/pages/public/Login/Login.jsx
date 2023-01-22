import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { isAuthenticated } from "../../../services/auth";

import { login } from "../../../services/auth";

import { UserContext } from "../../../UserContext";

const avatarStyle = { backgroundColor: "#42a5f5" };

// const reloadPage = () => window.location.reload();

export default function SignIn() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("username", email);
      bodyFormData.append("password", password);
      const response = await api.post("/api/v1/login", bodyFormData);
      login(response.data.access_token);
      const user = await isAuthenticated(response.data.access_token);
      setUser(user);
      navigate("/inventory");
      // reloadPage();
    } catch (error) {
      console.log(error.response.data.detail);
      setErrorMessage(error.response.data.detail);
    }
  };

  return (
    <>
      {user ? (
        <Navigate to="/inventory" />
      ) : (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              style={{ marginBottom: 40 }}
            >
              PrejuZero
            </Typography>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={loginHandler}
              noValidate
              sx={{ mt: 1 }}
            >
              {errorMessage && (
                <Box display="flex" justifyContent="center">
                  <Typography variant="p" color="red">
                    {errorMessage}
                  </Typography>
                </Box>
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="off"
                autoFocus
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={avatarStyle}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}
