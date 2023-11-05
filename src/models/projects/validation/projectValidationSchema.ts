import * as Yup from "yup";

const projectValidationSchema = Yup.object({
  title: Yup.string().required("Required field").min(1),
});

export default projectValidationSchema;
