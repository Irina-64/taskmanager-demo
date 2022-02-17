import {generateTask} from '../mock/task.js';

const TASK_COUNT = 3;

export default class TasksModel {
  tasks = Array.from({length: TASK_COUNT}, generateTask);

  getTasks = () => this.tasks;
}
