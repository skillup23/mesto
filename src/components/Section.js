export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((object) => {
      this._renderer(object);
    }); 
  }

  setItem(element) {
    this._container.append(element);
  }

  setItemStart(element) {
    this._container.prepend(element);
  }
}