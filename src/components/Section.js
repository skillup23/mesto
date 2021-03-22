export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems(userData) {
    this._renderedItems.forEach((object) => {
      this._renderer(object, userData);
    }); 
  }
  // renderItems(userData) {
  //   this._renderedItems.forEach(object => 
  //     this._renderer(object, userData));
  // }

  appendCard(element) {
    this._container.append(element);
  }

  prependCard(element) {
    this._container.prepend(element);
  }

  setRenderedItems(data) {
    this._renderedItems = data;
  }
}