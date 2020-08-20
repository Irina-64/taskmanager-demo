import dayjs from 'dayjs';

const isTaskExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

const isTaskExpiringToday = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'D');

const isTaskRepeating = (repeating) => Object.values(repeating).some(Boolean);

const formatTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format('D MMMM') : '';

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortTaskUp = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
};

const sortTaskDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  return weight ?? dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
};

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');

export {isTaskExpired, isTaskExpiringToday, isTaskRepeating, formatTaskDueDate, sortTaskUp, sortTaskDown, isDatesEqual};
