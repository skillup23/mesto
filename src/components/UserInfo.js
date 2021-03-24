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
    if(id){
      this._id = id
    };
    if(userName){
      this._name.textContent = userName
    };
    if(userInfo){
      this._info.textContent = userInfo
    };
    if(userAvatar){
      this._avatar.src = userAvatar
    };
  }
}
