export class Section {
  _renderedItems;
  _renderer;
  _container;

  constructor({ item, renderer }, containerSelector) {
    this._renderedItems = item;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
