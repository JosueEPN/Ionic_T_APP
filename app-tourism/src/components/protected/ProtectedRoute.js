import React from "react";
import { Redirect, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IonButton } from "@ionic/react";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!user) return <Redirect to="/login" />;

  return (
    <>
      {children}
    </>
  );
}

export default ProtectedRoute;
