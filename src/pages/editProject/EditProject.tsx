import React, { FC } from "react";
import PageTemplate from "../../templates/PageTemplate";
import Header from "../../components/molecules/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import useProject from "../../models/projects/useProject";
import Button from "../../components/atoms/button/Button";
import ButtonVariant from "../../components/atoms/button/buttonVariant";
import Input from "../../components/atoms/input/Input";
import Loader from "../../components/atoms/loader/Loader";
import ErrorMessage from "../../components/atoms/errorMessage/ErrorMessage";

const EditProjectPage: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    formik,
    tasks,
    newTask,
    isLoading,
    handleChangeNewTask,
    handleAddTask,
    handleRemoveTask,
    isMytationLoading,
  } = useProject(params.id || "");
  return (
    <PageTemplate>
      <Header title={"Edit"} />
      {isLoading && (
        <div className={"flex items-center justify-center"}>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <form className={"bg-slate-200 p-4 xl:w-1/2 md:w-full rounded"}>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Project title:</h2>
            <Input
              name={"title"}
              value={formik.values.title}
              onChange={(val) => formik.setFieldValue("title", val)}
            />
            {formik.errors.title ? (
              <ErrorMessage title={formik.errors.title} />
            ) : null}
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Project task:</h2>
            <div className="flex">
              <Input
                name={"newTask"}
                value={newTask}
                onChange={(val) => handleChangeNewTask(val)}
                width={"w-4/5"}
              />
              <Button
                title="Add task"
                variant={ButtonVariant.info}
                onClick={() => {
                  handleAddTask();
                }}
                width={"w-1/5"}
              />
            </div>
            <ul className="list-disc pl-8 mt-3 mb-3">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={"mb-3 border-b-[1px] border-slate-400 pb-1"}
                >
                  <div className={"flex items-center justify-between"}>
                    <span>{task}</span>
                    <Button
                      title="Remove"
                      variant={ButtonVariant.remove}
                      onClick={() => {
                        handleRemoveTask(task);
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Project comment:</h2>
            <Input
              name={"comment"}
              value={formik.values.comment}
              onChange={(val) => formik.setFieldValue("comment", val)}
            />
          </div>
          <div className={"flex items-center w-full"}>
            <Button
              title="Cancel"
              variant={ButtonVariant.info}
              me={"me-2"}
              onClick={() => {
                navigate("/");
              }}
            />
            <Button
              title="Edit"
              variant={ButtonVariant.success}
              isLoading={isMytationLoading}
              onClick={() => {
                formik.handleSubmit();
              }}
            />
          </div>
        </form>
      )}
    </PageTemplate>
  );
};

export default EditProjectPage;
