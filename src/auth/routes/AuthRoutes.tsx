import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const AuthRoutes = () => {
  if (status === "authenticated") {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      {/* Ruta de Logueo */}
      <Route path="login" element={<LoginPage />} />
      {/* Ruta de Registro */}
      <Route path="register" element={<RegisterPage />} />

      {/* Cualquier otra ruta */}
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
