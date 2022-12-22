export class Api {
  constructor(options) {
    this._baseUsl = options.baseUrl;
    this._headers = options.headers;
  }

  async getUserInfo() {
    const response = await fetch(`${this._baseUsl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    });
    const data = response.json();
    return data;
  }

  async setUserInfo(data) {
    const response = await fetch(`${this._baseUsl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    const dataPromise = response.json();
    return dataPromise;
  }

  async getInitialCards() {
    const response = await fetch(`${this._baseUsl}/cards`, {
      method: 'GET',
      headers: this._headers,
    });
    const data = response.json();
    return data;
  }

  async addNewCard(data) {
    const response = await fetch(`${this._baseUsl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data['place-name'],
        link: data['link'],
      }),
    });
    const dataPromise = response.json();
    return dataPromise;
  }

  async deleteCard(data) {
    const response = await fetch(`${this._baseUsl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
    const dataPromise = response.json();
    return dataPromise;
  }

  async toggleLikes(data, isLike) {
    const response = !isLike
      ? await fetch(`${this._baseUsl}/cards/${data._id}/likes`, {
          method: 'PUT',
          headers: this._headers,
        })
      : await fetch(`${this._baseUsl}/cards/${data._id}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        });
    const dataPromise = response.json();
    return dataPromise;
  }
}
