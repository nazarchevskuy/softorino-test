import ITask from "../../../api/interfaces/task";

interface IProjectFormData {
  id: string;
  title: string;
  tasks: ITask[];
  comment: string;
}

export default IProjectFormData;
