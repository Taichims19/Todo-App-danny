import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

export const AuthRoutes = () => {
  const { state } = useAuthContext();

  useEffect(() => {
    console.log("state.isAuthenticated  ", state.isAuthenticated);
  }, [state]);

  if (state.isAuthenticated === true) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      {state.isAuthenticated ? (
        <Route path="*" element={<Navigate to="/" />} />
      ) : (
        <>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};
