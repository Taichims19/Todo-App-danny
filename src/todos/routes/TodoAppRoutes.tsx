import { Navigate, Route, Routes } from "react-router-dom";

import { TodoAppPage } from "../pages/TodoAppPage";

export const TodoAppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoAppPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
