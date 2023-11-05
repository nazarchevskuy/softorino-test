import { useEffect, useState } from "react";
import useGetProjectQuery from "../../api/queries/useGetProjectQuery";
import { useFormik, FormikProps } from "formik";
import useEditProjectMutation from "../../api/mutation/useEditProjectMutation";
import IProject from "../../api/interfaces/project";
import IProjectFormData from "./interfaces/projectFormData";
import { useNavigate } from "react-router-dom";
import projectValidationSchema from "./validation/projectValidationSchema";
import { toast } from "react-toastify";

interface UseProjectRes {
  formik: FormikProps<IProjectFormData>;
  tasks: string[];
  newTask: string;
  isLoading: boolean;
  handleChangeNewTask: (val: string) => void;
  handleAddTask: () => void;
  handleRemoveTask: (title: string) => void;
  isMytationLoading: boolean;
}

const useProject: (projectId?: string) => UseProjectRes = (projectId) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [isMytationLoading, setIsMytationLoading] = useState<boolean>(false);

  const { data, isLoading } = useGetProjectQuery(projectId || "");
  const { mutateAsync } = useEditProjectMutation();

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

  useEffect(() => {
    if (!data) return;
    setTasks(data.tasks.map((task) => task.title));
  }, [data]);

  useEffect(() => {
    formik.setFieldValue(
      "tasks",
      tasks.map((task, index) => ({ id: index + 1, title: task }))
    );
  }, [tasks]);

  const formik = useFormik<IProjectFormData>({
    initialValues: {
      id: data?.id || "",
      title: data?.title || "",
      tasks: data?.tasks || [],
      comment: data?.comment || "",
    },
    validationSchema: projectValidationSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (project) => {
      setIsMytationLoading(true);
      mutateAsync({ ...project })
        .then((res) => {
          const projectsList: IProject[] = JSON.parse(
            localStorage.getItem("projects") as string
          );
          const newProjectsList = projectsList.map((oldOroject) => {
            if (oldOroject.id === project.id) {
              return { ...project };
            }
            return oldOroject;
          });
          toast.success(res.message);
          navigate("/");
          localStorage.setItem(
            "projects",
            JSON.stringify([...newProjectsList])
          );
        })
        .catch(() => {
          toast.error("Something went wrong...");
        })
        .finally(() => {
          formik.resetForm();
          setIsMytationLoading(false);
        });
    },
  });

  return {
    formik,
    tasks,
    newTask,
    isLoading,
    handleChangeNewTask,
    handleAddTask,
    handleRemoveTask,
    isMytationLoading,
  };
};

export default useProject;
