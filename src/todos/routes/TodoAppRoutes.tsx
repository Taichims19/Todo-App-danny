import { Navigate, Route, Routes } from "react-router-dom";
import { TodoAppPage } from "../pages/TodoAppPage";

export const TodoAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoAppPage />} />
      {/* Maneja todas las rutas debajo de la raíz */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
