import IProject from "../interfaces/project";

const projectsMock: IProject[] = [
  {
    id: "1",
    title: "Project 1",
    tasks: [
      {
        id: "1",
        title: "task #1",
      },
      {
        id: "2",
        title: "task #2",
      },
    ],
    comment: "This is cool project!",
  },
  {
    id: "2",
    title: "Project 2",
    tasks: [
      {
        id: "1",
        title: "task #1",
      },
    ],
    comment: "This is good project!",
  },
  {
    id: "3",
    title: "Project 3",
    tasks: [
      {
        id: "1",
        title: "task #1",
      },
      {
        id: "2",
        title: "task #2",
      },
      {
        id: "3",
        title: "task #3",
      },
    ],
    comment: "This is bad project(((",
  },
];

export default projectsMock;
