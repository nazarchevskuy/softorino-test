import * as Yup from "yup";

const loginValidationSchema = Yup.object({
  login: Yup.string().required("Required field").min(1),
  password: Yup.string().required("Required field").min(1),
});

export default loginValidationSchema;
