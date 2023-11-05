import { UseMutationResult, useMutation } from "@tanstack/react-query";
import IProject from "../interfaces/project";

interface EditProjectResponse {
  message: string;
}

const useEditProjectMutation: () => UseMutationResult<
  EditProjectResponse,
  null,
  IProject
> = () => {
  return useMutation({
    mutationKey: ["editProjectMutation"],
    mutationFn: async (project) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = {
        message: `The ${project.title} project has been successfully  edited`,
      };
      return res;
    },
  });
};

export default useEditProjectMutation;
