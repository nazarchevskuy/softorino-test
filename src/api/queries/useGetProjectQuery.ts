import { UseQueryResult, useQuery } from "@tanstack/react-query";
import IProject from "../interfaces/project";

const useGetProjectQuery: (projectId: string) => UseQueryResult<IProject> = (
  projectId
) => {
  return useQuery({
    queryKey: ["ProjectQuery", projectId],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const project: IProject[] = JSON.parse(
            localStorage.getItem("projects") as string
          ).find((project: IProject) => {
            return project.id === projectId;
          });
          resolve(project);
        }, 1000);
      });
    },
  });
};

export default useGetProjectQuery;
