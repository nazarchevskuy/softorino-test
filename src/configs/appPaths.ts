const AppPaths = {
  ProjectsPage: "/",
  LoginPage: "/login",
  EditProjectPage: "/edit-project/:id",
  openEditProjectPage: (id: string) => `/edit-project/${id}`,
};

export default AppPaths;
