class SearchView {
  _parentElement = document.querySelector('.search');
  _searchField = document.querySelector('.search__field');
  getQuery() {
    return this._searchField.value;
  }
  clear() {
    this._searchField.value = '';
  }
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
