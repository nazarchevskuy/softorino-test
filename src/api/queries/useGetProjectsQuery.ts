import { UseQueryResult, useQuery } from "@tanstack/react-query";
import IProject from "../interfaces/project";
import projectsMock from "../mocks/projectsMock";

const useGetProjectsQuery: () => UseQueryResult<IProject[]> = () => {
  return useQuery({
    queryKey: ["ProjectsQuery"],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(projectsMock);
        }, 1000);
      });
    },
  });
};

export default useGetProjectsQuery;
