import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Menu from "../components/Menu/Menu";

import Login from "../pages/public/Login/Login";

import Inventory from "../pages/private/Inventory/Inventory";
import MyInventory from "../pages/private/Inventory/MyInventory";
import InventoryForm from "../pages/private/Inventory/InventoryForm";

import Users from "../pages/private/Users/Users";

import Profile from "../pages/private/Profile/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <Menu component={<Inventory />} />
          </PrivateRoute>
        }
      />
      <Route
        path="/inventory/:inventoryId"
        element={
          <PrivateRoute>
            <Menu component={<InventoryForm />} />
          </PrivateRoute>
        }
      />
      <Route
        path="/myinventory"
        element={
          <PrivateRoute>
            <Menu component={<MyInventory />} />
          </PrivateRoute>
        }
      />
      <Route
        path="/inventory/new"
        element={
          <PrivateRoute>
            <Menu component={<InventoryForm new />} />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Menu component={<Users />} />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Menu component={<Profile />} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
