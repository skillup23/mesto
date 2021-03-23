export default class UserInfo{
  constructor({ id, name, info, avatar }) {
    this._id = id;
    this._name = name;
    this._info = info;
    this._avatar = avatar;
  }

  getUserInfo() {
    const userInformation = {
      _id: this._id,
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.src
    }

    return userInformation;
  }

  setUserInfo(id, userName, userInfo, userAvatar) {
    if(this._id !== ''){
      this._id = id
    };
    if(this._name.textContent !== ''){
      this._name.textContent = userName
    };
    if(this._info.textContent !== ''){
      this._info.textContent = userInfo
    };
    if(this._avatar.src !== ''){
      this._avatar.src = userAvatar
    };
  }
}
