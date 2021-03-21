export default class Card {
  constructor({ data, userData, handleCardClick, handleDeleteIconClick, handleLikeClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
    this._userData = userData;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__foto');
    this._likeElement = this._element.querySelector('.element__like');
    this._deleteElement = this._element.querySelector('.element__delete');
  }

  _getTemplate() {// забираем размеку из HTML и клонируем элемент, создаем this._element
    const cardElementNew = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    return cardElementNew;
  }

  generateCard() {
  // Запишем разметку в приватное поле _element. 
  // Так у других элементов появится доступ к ней.
    this._setEventListeners();
    this._setDeleteIcon();
    this.infoLikes(this._data);
    // console.log(this._data.owner._id);
    // console.log(this._userData._id);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__name-mesto').textContent = this._name;

    return this._element;
  }

  _setDeleteIcon() {
    if (this._userData._id !== this._data.owner._id)//если мой пользователь не владелец картинки, то кнопу удаления не делать
    this._deleteElement.remove()
  }

  isLiked() {
    if (this._data.likes.some((data) => data._id === this._userData._id)){//методом some вызываем колбэк для каждого лайка
      return true                                                         //если в выбранном элементе есть лайк от моего пользователя
    }                                                                     //запутался как это получилось(((
  }

  infoLikes(data) {
    this._data = data;
    this._element.querySelector('.element__like-number').textContent = this._data.likes.length;//количество лайков берем с сервера и оно равно длине likes у каждого объекта
    if (this.isLiked()) {
      this._likeElement.classList.add('element__like_active')
    } else {
      this._likeElement.classList.remove('element__like_active')
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
    // this._element.querySelector('.element__like').addEventListener('click', this._isLike);
    // this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard);
    
    this._deleteElement.addEventListener('click', () => {
      this._handleDeleteIconClick(this._element, this._data._id)
    });

    this._likeElement.addEventListener('click', () => {
      this._handleLikeClick(this._data._id)
    });
  }

  // _isLike(event) {
  //   event.target.classList.toggle('element__like_active');
  // }

  // _deleteCard(event) {
  //   event.target.closest('.element').remove();
  // }


}