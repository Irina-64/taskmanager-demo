import NewTaskButtonView from './view/new-task-button-view.js';
import FilterView from './view/filter-view.js';
import BoardView from './view/board-view.js';
import SortView from './view/sort-view.js';
import TaskListView from './view/task-list-view.js';
import TaskView from './view/task-view.js';
import TaskEditView from './view/task-edit-view.js';
import LoadMoreButtonView from './view/load-more-button-view.js';
import {render} from './render.js';

const TASK_COUNT = 3;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

render(new NewTaskButtonView(), siteHeaderElement);
render(new FilterView(), siteMainElement);

const boardComponent = new BoardView();
render(boardComponent, siteMainElement);

render(new SortView(), boardComponent.getElement());

const taskListComponent = new TaskListView();
render(taskListComponent, boardComponent.getElement());

render(new TaskEditView(), taskListComponent.getElement());

for (let i = 0; i < TASK_COUNT; i++) {
  render(new TaskView(), taskListComponent.getElement());
}

render(new LoadMoreButtonView(), boardComponent.getElement());
