import AbstractObservable from '../utils/abstract-observable.js';
import {generateTask} from '../mock/task.js';

const TASK_COUNT = 22;

export default class TasksModel extends AbstractObservable {
  #tasks = Array.from({length: TASK_COUNT}, generateTask);

  get tasks() {
    return this.#tasks;
  }

  updateTask = (updateType, update) => {
    const index = this.#tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#tasks = [
      ...this.#tasks.slice(0, index),
      update,
      ...this.#tasks.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addTask = (updateType, update) => {
    this.#tasks = [
      update,
      ...this.#tasks,
    ];

    this._notify(updateType, update);
  }

  deleteTask = (updateType, update) => {
    const index = this.#tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#tasks = [
      ...this.#tasks.slice(0, index),
      ...this.#tasks.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
