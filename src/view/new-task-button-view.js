import AbstractView from './abstract-view.js';

// Функцию для генерации HTML-разметки можно превратить в метод класса,
// однако делать мы этого не будем, чтобы не раздувать diff изменений
const createNewTaskButtonTemplate = () => '<button class="control__button">+ ADD NEW TASK</button>';

export default class NewTaskButtonView extends AbstractView {
  get template() {
    return createNewTaskButtonTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = () => {
    this._callback.click();
  }
}
