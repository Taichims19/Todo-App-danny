import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { TodoAppRoutes } from "../todos/routes/TodoAppRoutes";
import { useAuthContext } from "../context/AuthContext";

const AppRouter = () => {
  const { state } = useAuthContext();

  return (
    <Routes>
      {state.isAuthenticated ? (
        <>
          <Route path="/*" element={<TodoAppRoutes />} />
          <Route path="/auth/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
