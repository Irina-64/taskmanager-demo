import BoardView from '../view/board-view.js';
import SortView from '../view/sort-view.js';
import TaskListView from '../view/task-list-view.js';
import TaskView from '../view/task-view.js';
import TaskEditView from '../view/task-edit-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import {render} from '../render.js';

const TASK_COUNT_PER_STEP = 8;

export default class BoardPresenter {
  boardComponent = new BoardView();
  taskListComponent = new TaskListView();

  init = (boardContainer, tasksModel) => {
    this.boardContainer = boardContainer;
    this.tasksModel = tasksModel;
    this.boardTasks = [...this.tasksModel.getTasks()];

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.taskListComponent, this.boardComponent.getElement());
    render(new TaskEditView(this.boardTasks[0]), this.taskListComponent.getElement());

    for (let i = 1; i < Math.min(this.boardTasks.length, TASK_COUNT_PER_STEP); i++) {
      render(new TaskView(this.boardTasks[i]), this.taskListComponent.getElement());
    }

    if (this.boardTasks.length > TASK_COUNT_PER_STEP) {
      const loadMoreButtonComponent = new LoadMoreButtonView();
      render(loadMoreButtonComponent, this.boardComponent.getElement());

      let renderedTaskCount = TASK_COUNT_PER_STEP;

      loadMoreButtonComponent.getElement().addEventListener('click', (evt) => {
        evt.preventDefault();
        this.boardTasks
          .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
          .forEach((task) => render(new TaskView(task), this.taskListComponent.getElement()));

        renderedTaskCount += TASK_COUNT_PER_STEP;

        if (renderedTaskCount >= this.boardTasks.length) {
          loadMoreButtonComponent.getElement().remove();
          loadMoreButtonComponent.removeElement();
        }
      });
    }
  };
}
