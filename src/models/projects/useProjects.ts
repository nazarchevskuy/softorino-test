import { useEffect, useState } from "react";
import IProject from "../../api/interfaces/project";
import useGetProjectsQuery from "../../api/queries/useGetProjectsQuery";
import { useFormik, FormikProps } from "formik";
import { v4 as uuidv4 } from "uuid";
import IProjectsFormData from "./interfaces/projectsFormData";
import useCreateProjectMutation from "../../api/mutation/useCreateProjectMutation";
import useDeleteProjectMutation from "../../api/mutation/useDeleteProjectMutation";
import projectValidationScheme from "./validation/projectValidationSchema";
import { toast } from "react-toastify";

interface UseProjectsRes {
  projectsList: IProject[];
  isLoading: boolean;
  formik: FormikProps<IProjectsFormData>;
  handleChangeNewTask: (val: string) => void;
  handleAddTask: () => void;
  handleRemoveTask: (title: string) => void;
  handleRemoveProject: (id: string) => void;
  newTask: string;
  tasks: string[];
  isCreateMytationLoading: boolean;
  isRemoveMytationLoading: string;
}

const useProjects: () => UseProjectsRes = () => {
  const [projectsList, setProjectsList] = useState<IProject[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>([]);
  const [isCreateMytationLoading, setIsCreateMytationLoading] =
    useState<boolean>(false);
  const [isRemoveMytationLoading, setIsRemoveMytationLoading] =
    useState<string>("");

  const { data, isLoading } = useGetProjectsQuery();
  const { mutateAsync: createMutation } = useCreateProjectMutation();
  const { mutateAsync: deleteMutation } = useDeleteProjectMutation();

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const handleChangeNewTask = (val: string) => {
    setNewTask(val);
  };

  const handleRemoveTask = (title: string) => {
    setTasks(
      tasks.filter((task) => {
        return task !== title;
      })
    );
  };

  const handleRemoveProject = (id: string) => {
    setIsRemoveMytationLoading(id);
    deleteMutation(id)
      .then((res) => {
        toast.success(res.message);
        const handleSetProjectsList = () => {
          return projectsList.filter((project) => {
            return project.id !== id;
          });
        };
        setProjectsList(handleSetProjectsList());
        localStorage.setItem(
          "projects",
          JSON.stringify(handleSetProjectsList())
        );
      })
      .catch(() => {
        toast.error("Something went wrong...");
      })
      .finally(() => {
        setIsRemoveMytationLoading("");
      });
  };

  useEffect(() => {
    formik.setFieldValue(
      "tasks",
      tasks.map((task, index) => ({ id: index + 1, title: task }))
    );
  }, [tasks]);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (localStorage.getItem("projects") !== null) {
      const projectList: string = localStorage.getItem("projects") as string;
      setProjectsList(JSON.parse(projectList));
    } else {
      localStorage.setItem("projects", JSON.stringify(data));
      setProjectsList(data);
    }
  }, [data]);

  const formik = useFormik<IProjectsFormData>({
    initialValues: {
      title: "",
      tasks: [],
      comment: "",
    },
    validateOnChange: false,
    validationSchema: projectValidationScheme,
    onSubmit: (value) => {
      setIsCreateMytationLoading(true);
      setNewTask("");
      setTasks([]);
      const uniqueId = uuidv4();

      createMutation({ ...value, id: uniqueId })
        .then((res) => {
          setProjectsList((prevState) => {
            const newState: IProject[] = [
              ...prevState,
              { ...value, id: uniqueId },
            ];
            return newState;
          });
          toast.success(res.message);
          localStorage.setItem(
            "projects",
            JSON.stringify([...projectsList, { ...value, id: uniqueId }])
          );
        })
        .catch(() => {
          toast.error("Something went wrong...");
        })
        .finally(() => {
          formik.resetForm();
          setIsCreateMytationLoading(false);
        });
    },
  });

  return {
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
  };
};

export default useProjects;
