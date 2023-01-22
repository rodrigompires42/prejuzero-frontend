import jwt_decoded from "jwt-decode";
import api from "./api";

export const KEYAPP = "PrejuZero.token";

export const isAuthenticated = async () => {
  const token = getToken();

  if (token) {
    const user = jwt_decoded(token);
    const response = await api.get(`/api/v1/users/${user.id}`);
    return response.data;
  }
};

export const getToken = () => localStorage.getItem(KEYAPP);

export const login = (token) => {
  localStorage.setItem(KEYAPP, token);
};

export const logout = () => {
  localStorage.removeItem(KEYAPP);
};
