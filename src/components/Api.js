export default class Api {
  constructor() {

  }

  getInitialCards() {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
          method: 'GET',
          headers: {
              authorization: '05f91987-8317-4af4-b0c3-253fbec9cd8b'
          }
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  getPersonInfo() {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
          method: 'GET',
          headers: {
              authorization: '05f91987-8317-4af4-b0c3-253fbec9cd8b',
              'Content-Type': 'application/json'
          }
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  sendUserInformation(data) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
          method: 'PATCH',
          headers: {
              authorization: '05f91987-8317-4af4-b0c3-253fbec9cd8b',
              'Content-Type': 'application/json'
          },
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
      return fetch('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
          method: 'POST',
          headers: {
              authorization: '05f91987-8317-4af4-b0c3-253fbec9cd8b',
              'Content-Type': 'application/json'
          },
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
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-21/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
              authorization: '05f91987-8317-4af4-b0c3-253fbec9cd8b',
              'Content-Type': 'application/json'
          },
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  likeCard(cardId) {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-21/cards/likes/${cardId}`, {
          method: 'PUT',
          headers: {
              authorization: '05f91987-8317-4af4-b0c3-253fbec9cd8b',
              'Content-Type': 'application/json'
          },
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  removelikeCard(cardId) {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-21/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: {
              authorization: '05f91987-8317-4af4-b0c3-253fbec9cd8b',
              'Content-Type': 'application/json'
          },
      })
          .then(res => {
              if (res.ok) {
                  return res.json();
              }

              return Promise.reject(`Ошибка: ${res.status}`);
          })
  }

  editAvatar(data) {
      return fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me/avatar', {
          method: 'PATCH',
          headers: {
              authorization: '05f91987-8317-4af4-b0c3-253fbec9cd8b',
              'Content-Type': 'application/json'
          },
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