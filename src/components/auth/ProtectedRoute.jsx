import React from "react";
import { Route, Navigate } from "react-router-dom";
import AuthService from "./AuthService";
import Redirect from "./Redirect";

const ProtectedRoute = ({ element }) => {
  if (AuthService.isLoggedIn()) return element;
  else {
    return <Redirect to="/agspert/login" />;
  }
};

export default ProtectedRoute;
