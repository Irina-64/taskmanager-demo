import NewTaskButtonView from './view/new-task-button-view.js';
import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import TasksModel from './model/tasks-model.js';
import {generateFilter} from './mock/filter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = siteMainElement.querySelector('.main__control');

const tasksModel = new TasksModel();
const boardPresenter = new BoardPresenter();

const filters = generateFilter(tasksModel.getTasks());

render(new NewTaskButtonView(), siteHeaderElement);
render(new FilterView(filters), siteMainElement);

boardPresenter.init(siteMainElement, tasksModel);
