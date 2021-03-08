export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
  // забираем размеку из HTML и клонируем элемент
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
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__foto');
    this._setEventListeners(); // добавим обработчики

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.element__name-mesto').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
    this._element.querySelector('.element__like').addEventListener('click', this._isLike);
    this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard);
  }

  _isLike(event) {
    event.target.classList.toggle('element__like_active');
  }

  _deleteCard(event) {
    event.target.closest('.element').remove();
  }
}