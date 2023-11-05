import { UseMutationResult, useMutation } from "@tanstack/react-query";
import ILoginFormData from "../../models/login/interfaces/loginFormData";

interface LoginResponse {
  message: string;
  status: number;
  loginToken: string;
  userName: string;
}

const useLoginMutation: () => UseMutationResult<
  LoginResponse,
  null,
  ILoginFormData
> = () => {
  return useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: async (loginData) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      let res;
      if (loginData.login === "admin" && loginData.password === "password") {
        res = {
          message: "Authorization is successful",
          status: 200,
          loginToken: "dklf78kj674rh876",
          userName: "admin",
        };
      } else {
        res = {
          message:
            "The login or password was entered incorrectly. Please try again...",
          status: 404,
          loginToken: "",
          userName: "",
        };
      }

      return res;
    },
  });
};

export default useLoginMutation;
