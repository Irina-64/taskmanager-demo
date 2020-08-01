import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import TaskListView from '../view/task-list-view.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import NoTaskView from '../view/no-task-view.js';
import {render} from '../render.js';

const TASK_COUNT_PER_STEP = 8;

export default class BoardPresenter {
  #boardContainer = null;
  #tasksModel = null;

  #boardComponent = new BoardView();
  #taskListComponent = new TaskListView();

  #boardTasks = [];

  constructor(boardContainer, tasksModel) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init = () => {
    this.#boardTasks = [...this.#tasksModel.tasks];

    this.#renderBoard();
  };

  #renderTask = (task) => {
    const taskComponent = new TaskView(task);
    const taskEditComponent = new TaskEditView(task);

    const replaceCardToForm = () => {
      this.#taskListComponent.element.replaceChild(taskEditComponent.element, taskComponent.element);
    };

    const replaceFormToCard = () => {
      this.#taskListComponent.element.replaceChild(taskComponent.element, taskEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    taskComponent.element.querySelector('.card__btn--edit').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    taskEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(taskComponent, this.#taskListComponent.element);
  };

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#boardTasks.every((task) => task.isArchive)) {
      render(new NoTaskView(), this.#boardComponent.element);
      return;
    }

    render(new SortView(), this.#boardComponent.element);

    render(this.#taskListComponent, this.#boardComponent.element);

    for (let i = 0; i < Math.min(this.#boardTasks.length, TASK_COUNT_PER_STEP); i++) {
      this.#renderTask(this.#boardTasks[i]);
    }

    if (this.#boardTasks.length > TASK_COUNT_PER_STEP) {
      const loadMoreButtonComponent = new LoadMoreButtonView();
      render(loadMoreButtonComponent, this.#boardComponent.element);

      let renderedTaskCount = TASK_COUNT_PER_STEP;

      loadMoreButtonComponent.element.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.#boardTasks
          .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
          .forEach((task) => this.#renderTask(task));

        renderedTaskCount += TASK_COUNT_PER_STEP;

        if (renderedTaskCount >= this.#boardTasks.length) {
          loadMoreButtonComponent.element.remove();
          loadMoreButtonComponent.removeElement();
        }
      });
    }
  };
}
