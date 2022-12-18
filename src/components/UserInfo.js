export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
    this._nameElement = document.querySelector(profileNameSelector);
    this._jobElement = document.querySelector(profileJobSelector);
    this._avatarElement = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
    };
    return userData;
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._jobElement.textContent = userData.about;
    this._avatarElement.src = userData.avatar;
    this._avatarElement.alt = `Фотография ${userData.name}`
  }
}
