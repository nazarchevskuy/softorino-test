import { UseMutationResult, useMutation } from "@tanstack/react-query";
import IProject from "../interfaces/project";

interface CreateProjectResponse {
  message: string;
}

const useCreateProjectMutation: () => UseMutationResult<
  CreateProjectResponse,
  null,
  IProject
> = () => {
  return useMutation({
    mutationKey: ["createProjectMutation"],
    mutationFn: async (project) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = {
        message: `The ${project.title} project has been successfully created`,
      };
      return res;
    },
  });
};

export default useCreateProjectMutation;
