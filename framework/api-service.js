/** @enum {string} Перечисление возможных методов запроса */
const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

/**
 * Класс для отправки запросов к серверу
 */
export default class ApiService {
  /** @type {string} Адрес сервера */
  #endPoint = null;

  /** @type {string} Авторизационный токен*/
  #authorization = null;

  /**
   * @param {string} endPoint Адрес сервера
   * @param {string} authorization Авторизационный токен
   */
  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  /**
   * Метод для отправки запроса к серверу
   * @param {Object} config Объект с настройками
   * @param {string} config.url Адрес относительно сервера
   * @param {string} [config.method] Метод запроса
   * @param {string} [config.body] Тело запроса
   * @param {Headers} [config.headers] Заголовки запроса
   * @returns {Promise<Response>}
   */
  _load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  /**
   * Метод для обработки ответа
   * @param {Response} response Объект ответа
   * @returns {Promise<JSON>}
   */
  static parseResponse = (response) => response.json();

  /**
   * Метод для проверки ответа
   * @param {Response} response Объект ответа
   */
  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  /**
   * Метод для обработки ошибок
   * @param {Error} err Объект ошибки
   */
  static catchError = (err) => {
    throw err;
  }
}
