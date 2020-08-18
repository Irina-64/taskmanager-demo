import AbstractObservable from '../utils/abstract-observable.js';
import {generateTask} from '../mock/task.js';

const TASK_COUNT = 22;

export default class TasksModel extends AbstractObservable {
  #tasks = Array.from({length: TASK_COUNT}, generateTask);

  get tasks() {
    return this.#tasks;
  }
}
