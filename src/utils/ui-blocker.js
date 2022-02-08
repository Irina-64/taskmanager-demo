const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class UiBlocker {
  #element;
  #startTime;
  #endTime;
  #timerId;

  constructor() {
    this.#element = document.createElement('div');
    this.#element.classList.add('ui-blocker');
    document.body.append(this.#element);
  }

  block = () => {
    this.#startTime = Date.now();
    this.#timerId = setTimeout(() => {
      this.#addClass();
    }, TimeLimit.LOWER_LIMIT);
  };

  unblock = () => {
    this.#endTime = Date.now();
    const duration = this.#endTime - this.#startTime;

    if (duration < TimeLimit.LOWER_LIMIT) {
      clearTimeout(this.#timerId);
      return;
    }

    if (duration >= TimeLimit.UPPER_LIMIT) {
      this.#removeClass();
      return;
    }

    setTimeout(this.#removeClass, TimeLimit.UPPER_LIMIT - duration);
  };


  #addClass = () => {
    this.#element.classList.add('ui-blocker--on');
  };

  #removeClass = () => {
    this.#element.classList.remove('ui-blocker--on');
  };
}
