import dayjs from 'dayjs';

const isTaskExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

const isTaskExpiringToday = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'D');

const isTaskRepeating = (repeating) => Object.values(repeating).some(Boolean);

const formatTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format('D MMMM') : '';

export {isTaskExpired, isTaskExpiringToday, isTaskRepeating, formatTaskDueDate};
