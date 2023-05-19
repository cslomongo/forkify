import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { delay_modal } from './config.js';
import { async } from 'regenerator-runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const get1Recipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // resultView.update(model.getSearchPage());

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
    bookmarkView.update(model.state.bookmarks);

    // recipeView.update(model.getSearchPage());
  } catch (error) {
    recipeView.renderError();
    console.log(error);
  }
};

const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    searchView.clear();
    if (!query) return;
    resultView.renderSpinner();
    await model.loadSearchResult(query);

    resultView.render(model.getSearchPage());
    paginationView.render(model.state.search);
  } catch (error) {
    resultView.renderError();
    console.log(error);
  }
};
const loadPagination = function (goto) {
  // model.state.search.page = goto;

  resultView.render(model.getSearchPage(goto));
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};
const controlUploadRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    console.log(newRecipe);
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    //Bookmarks
    bookmarkView.render(model.state.bookmarks);

    //URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleHidden();
    }, delay_modal);
  } catch (error) {
    addRecipeView.renderError(error);
    console.log(error);
  }
};
const newFeature = function () {
  console.log('new feature');
};
const init = function () {
  bookmarkView.addHandlerBookmark(controlBookmarks);
  recipeView.addHandlerRender(get1Recipe);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(loadPagination);
  recipeView.addHandlerUpdateServing(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlUploadRecipe);
  newFeature();
  console.log('welcome');
};
init();
controlSearchResult();
