 const tasks = [
  {id:1,
    topic: "Web Design",
    title: "Название задачи",
    date: "30.10.23",
    status: "Без статуса",
  },
  {id:2,
    topic: "Research",
    title: "Название задачи",
    date: "30.10.23",
    status: "В работе",
  },
  {id:3,
    topic: "Copywriting",
    title: "Название задачи",
    date: "30.10.23",
    status: "Готово",
  },
];

export function getTasks() {
  return tasks
};

/* const topicStyles = {
  _orange: {
    backgroundColor: "#ffe4c2",
    color: "#ff6d00",
  },

  _green: {
    backgroundColor: "#b4fdd1",
    color: "#06b16e",
  },

  _purple: {
    backgroundColor: "#e9d4ff",
    color: "#9a48f1",
  },

  _gray: {
    background: "#94a6be",
    color: "#ffffff",
  }
}; */

/* export function getTopicColor() => {
  if (topic === "Web Design") {
    return "_orange";
  } else if (topic === "Research") {
    return "_green";
  } else if (topic === "Copywriting") {
    return "_purple"
  } else {return "_gray"}
} */



