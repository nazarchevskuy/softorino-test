import { useFormik, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import ILoginFormData from "./interfaces/loginFormData";
import useLoginMutation from "../../api/mutation/useLoginMutation";
import { useState } from "react";
import AppPaths from "../../configs/appPaths";
import loginValidationSchema from "./validation/loginValidationSchema";
import { toast } from "react-toastify";

interface UseLoginRes {
  formik: FormikProps<ILoginFormData>;
  loginError: string;
  handleLogout: () => void;
  isMytationLoading: boolean;
}

const useLogin: () => UseLoginRes = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>("");
  const [isMytationLoading, setIsMytationLoading] = useState<boolean>(false);

  const { mutateAsync } = useLoginMutation();

  const handleLogout = () => {
    localStorage.clear();
    navigate(AppPaths.LoginPage);
  };

  const formik = useFormik<ILoginFormData>({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    validateOnChange: false,
    onSubmit: (val) => {
      setIsMytationLoading(true);
      mutateAsync(val)
        .then((res) => {
          formik.resetForm();
          if (res.status === 200) {
            navigate("/");
            localStorage.setItem("loginToken", res.loginToken);
            localStorage.setItem("userName", res.userName);
          } else {
            setLoginError(res.message);
          }
        })
        .catch(() => {
          toast.error("Something went wrong...");
        })
        .finally(() => {
          setIsMytationLoading(false);
        });
    },
  });

  return {
    formik,
    loginError,
    handleLogout,
    isMytationLoading,
  };
};

export default useLogin;
