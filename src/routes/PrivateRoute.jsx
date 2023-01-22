import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../UserContext";

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext);

  return user ? props.children : <Navigate to="/login" />;
};

export default PrivateRoute;
