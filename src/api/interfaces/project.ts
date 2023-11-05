import ITask from "./task";

interface IProject {
  id: string;
  title: string;
  tasks: ITask[];
  comment: string;
}

export default IProject;
