import ITask from "../../../api/interfaces/task";

interface IProjectsFormData {
  title: string;
  tasks: ITask[];
  comment: string;
}

export default IProjectsFormData;
