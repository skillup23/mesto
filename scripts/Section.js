import Card from './Card.js'

export default class Section {
  constructor({ data }, containerSelector) {
    this._renderedItems = data;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((object) => {
      const card = new Card(object, '.element_template_type_default');

      const cardElement = card.generateCard();

      this.setItem(cardElement);
    }); 
  }

  setItem(element) {
    this._container.append(element);
  }
}