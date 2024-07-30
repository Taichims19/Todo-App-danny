import { Routes, Route } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { TodoAppRoutes } from "../todos/routes/TodoAppRoutes";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoAppRoutes />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
    </Routes>
  );
};

export default AppRouter; // Asegúrate de exportar AppRouter como default
