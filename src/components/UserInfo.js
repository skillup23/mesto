export default class UserInfo{
  constructor({ name, info }) {
    this._name = name;
    this._info = info;
  }

  getUserInfo() {
    const userInformation = {
      name: this._name.textContent,
      info: this._info.textContent,
    }

    return userInformation;
  }

  setUserInfo(userName, userInfo) {
    this._name.textContent = userName;
    this._info.textContent = userInfo;
  }
}

