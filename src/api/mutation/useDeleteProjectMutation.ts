import { UseMutationResult, useMutation } from "@tanstack/react-query";

interface EditProjectResponse {
  message: string;
}

const useDeleteProjectMutation: () => UseMutationResult<
  EditProjectResponse,
  null,
  string
> = () => {
  return useMutation({
    mutationKey: ["deleteProjectMutation"],
    mutationFn: async (project) => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = {
        message: `Project has been successfully  deleted`,
      };
      return res;
    },
  });
};

export default useDeleteProjectMutation;
