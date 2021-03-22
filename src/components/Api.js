export default class Api {
  constructor({ url, groupId, headers} ) {
      this._url = url;
      this._groupId = groupId;
      this._headers = headers;
  }

  getInitialCards() {
      return fetch(`${this._url}/${this._groupId}/cards`, {
          method: 'GET',
          headers: this._headers
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  getPersonInfo() {
      return fetch(`${this._url}/${this._groupId}/users/me`, {
          method: 'GET',
          headers: this._headers
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  sendUserInformation(data) {
      return fetch(`${this._url}/${this._groupId}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              name: data.name,
              about: data.about
          })
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  addNewCard(data) {
      return fetch(`${this._url}/${this._groupId}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
              name: data.name,
              link: data.link
          })
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  delCard(cardId) {
      return fetch(`${this._url}/${this._groupId}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  likeCard(cardId) {
      return fetch(`${this._url}/${this._groupId}/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: this._headers,
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  removelikeCard(cardId) {
      return fetch(`${this._url}/${this._groupId}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  editAvatar(data) {
      return fetch(`${this._url}/${this._groupId}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              avatar: data.avatar
          })
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

}