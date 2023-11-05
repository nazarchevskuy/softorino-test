import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppPaths from "./configs/appPaths";
import ProjectsPage from "./pages/projects/ProjectsPage";
import LoginPage from "./pages/login/LoginPage";
import EditProjectPage from "./pages/editProject/EditProject";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./navigation/ProtectedRoute";
import ToastContainerComponent from "./components/atoms/toastContainerComponent/ToastContainerComponent";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route
            path={AppPaths.ProjectsPage}
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route path={AppPaths.LoginPage} element={<LoginPage />} />
          <Route
            path={AppPaths.EditProjectPage}
            element={
              <ProtectedRoute>
                <EditProjectPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainerComponent />
    </QueryClientProvider>
  );
};

export default App;
