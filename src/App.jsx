import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import { UserContext } from "./UserContext";
import AppRoutes from "./routes";
import { isAuthenticated } from "./services/auth";

const App = () => {
  const [user, setUser] = useState(null);
  const signedInUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    const user = await isAuthenticated();
    setUser(user);
  };

  useEffect(() => {
    loadData()
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.log("error: " + error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {!isLoading && (
        <UserContext.Provider value={signedInUser}>
          <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
            <CssBaseline />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </ThemeProvider>
        </UserContext.Provider>
      )}
    </>
  );
};

export default App;
