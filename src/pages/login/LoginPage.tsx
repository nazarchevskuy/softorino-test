import React, { FC } from "react";
import PageTemplate from "../../templates/PageTemplate";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import ButtonVariant from "../../components/atoms/button/buttonVariant";
import useLogin from "../../models/login/useLogin";
import ErrorMessage from "../../components/atoms/errorMessage/ErrorMessage";

const LoginPage: FC = () => {
  const { formik, loginError, isMytationLoading } = useLogin();
  return (
    <PageTemplate>
      <div className={"flex justify-center"}>
        <div
          className={
            "flex rounded flex-wrap bg-slate-200 xl:w-1/2 md:w-full p-5"
          }
        >
          <h2 className="text-2xl font-semibold mb-2 text-start">Login:</h2>
          <Input
            name={formik.values.login}
            value={formik.values.login}
            onChange={(val) => {
              formik.setFieldValue("login", val);
            }}
            mb={"mb-3"}
          />
          {formik.errors.login ? (
            <ErrorMessage title={formik.errors.login} />
          ) : null}
          <h2 className="text-2xl font-semibold mb-2 text-start">Password:</h2>
          <Input
            name={formik.values.password}
            value={formik.values.password}
            onChange={(val) => {
              formik.setFieldValue("password", val);
            }}
            mb={"mb-3"}
          />
          {formik.errors.password ? (
            <ErrorMessage title={formik.errors.password} />
          ) : null}
          <Button
            title={"login"}
            variant={ButtonVariant.success}
            isLoading={isMytationLoading}
            onClick={() => {
              formik.handleSubmit();
            }}
          />
          {loginError && <ErrorMessage title={loginError} isBordered />}
        </div>
      </div>
    </PageTemplate>
  );
};

export default LoginPage;
