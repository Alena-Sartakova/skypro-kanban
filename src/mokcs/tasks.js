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

const statusList = [
  "Без статуса",
  "Нужно сделать",
  "В работе",
  "Тестирование",
  "Готово",
];

export function getStatusList() {
  return statusList
};
export function getTasks() {
  return tasks
};


