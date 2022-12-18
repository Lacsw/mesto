export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._nameElement = document.querySelector(profileNameSelector);
    this._jobElement = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
    return userData;
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._jobElement.textContent = userData.about;
  }
}
