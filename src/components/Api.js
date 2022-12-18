export class Api {
  constructor(options) {
    this._baseUsl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUsl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this._baseUsl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  }
}
