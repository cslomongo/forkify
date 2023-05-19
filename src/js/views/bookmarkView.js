import icons from 'url:../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _defaultMessage = ' No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }
  _generate() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
