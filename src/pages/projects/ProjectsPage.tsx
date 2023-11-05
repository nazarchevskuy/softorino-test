import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import PageTemplate from "../../templates/PageTemplate";
import useProjects from "../../models/projects/useProjects";
import Header from "../../components/molecules/header/Header";
import Input from "../../components/atoms/input/Input";
import Button from "../../components/atoms/button/Button";
import ButtonVariant from "../../components/atoms/button/buttonVariant";
import Loader from "../../components/atoms/loader/Loader";
import AppPaths from "../../configs/appPaths";
import ErrorMessage from "../../components/atoms/errorMessage/ErrorMessage";
import EmptyState from "../../components/atoms/emptyState/EmptyState";

const ProjectsPage: FC = () => {
  const {
    projectsList,
    isLoading,
    formik,
    handleChangeNewTask,
    handleAddTask,
    handleRemoveTask,
    handleRemoveProject,
    newTask,
    tasks,
    isCreateMytationLoading,
    isRemoveMytationLoading,
  } = useProjects();

  const navigate = useNavigate();

  return (
    <PageTemplate>
      <Header title={"Dashboard"} />
      <div className={"flex flex-wrap justify-between rounded bg-slate-200"}>
        <div className={"p-4 xl:w-1/2 md:w-full"}>
          <h2 className="text-2xl font-semibold mb-2">Projects info:</h2>
          <h3 className="text-2xl  mb-2 flex items-center">
            Total count: {isLoading ? <Loader isSmall /> : projectsList.length}
          </h3>
        </div>
        <form className={"p-4 xl:w-1/2 md:w-full"}>
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
                width={"xl:w-4/5"}
              />
              <Button
                title="Add task"
                variant={ButtonVariant.info}
                onClick={() => {
                  handleAddTask();
                }}
                width={"xl:w-1/5"}
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
          <Button
            title="Add project"
            variant={ButtonVariant.success}
            isLoading={isCreateMytationLoading}
            onClick={() => {
              formik.handleSubmit();
            }}
          />
        </form>
      </div>
      <div className="mt-4">
        {isLoading && (
          <div className={"flex items-center justify-center"}>
            <Loader />
          </div>
        )}
        {!isLoading && (
          <>
            <h2 className="text-2xl font-semibold mb-2">Project list:</h2>
            {projectsList.map((project) => (
              <div
                key={project.id}
                className="border p-4 mb-4 rounded bg-slate-50"
              >
                <div className={"flex items-center justify-between"}>
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <div className={"flex items-center justify-between"}>
                    <Button
                      title="Edit"
                      variant={ButtonVariant.info}
                      me={"me-2"}
                      onClick={() => {
                        navigate(AppPaths.openEditProjectPage(project.id));
                      }}
                    />
                    <Button
                      title="Remove"
                      variant={ButtonVariant.remove}
                      isLoading={isRemoveMytationLoading === project.id}
                      onClick={() => {
                        handleRemoveProject(project.id);
                      }}
                    />
                  </div>
                </div>
                {project.tasks.length > 0 && (
                  <div className="mb-2">
                    <h4 className="text-lg font-semibold mb-1">Tasks:</h4>

                    <ul className="list-disc pl-8">
                      {project.tasks.map((task) => (
                        <li key={task.id}>{task.title}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.comment && (
                  <p className="mb-2">
                    <strong>Comment:</strong> {project.comment}
                  </p>
                )}
              </div>
            ))}
            {projectsList.length === 0 && <EmptyState title={"project"} />}
          </>
        )}
      </div>
    </PageTemplate>
  );
};

export default ProjectsPage;
