'use strict';
/* global $ */

// User can press a switch/checkbox to toggle between displaying all items or 
// displaying only items that are unchecked. 

// user clicks button. 
// Filter items in our STORE. Render items in our STORE. 

const STORE = {
  items: [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  hideCompleted: false
};


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join('');
}

function toggleChecked(){
  STORE.hideCompleted = !STORE.hideCompleted;
}

function handleHideCompletedCheckboxClicked(){
  $('#hide-completed-checkbox').click(function() {toggleChecked();
    console.log('hiii');
    renderShoppingList();
  });
}

function filterItems(){
  let result = STORE.items.filter((item) => !item.checked);
  return result;
}

function renderShoppingList() {
  if (STORE.hideCompleted === true){
    const shoppingListItemsString = generateShoppingItemsString(filterItems());
    console.log('filtering...');
    $('.js-shopping-list').html(shoppingListItemsString);
  }
  else{
    console.log('`renderShoppingList` ran');
    const shoppingListItemsString = generateShoppingItemsString(STORE.items);

    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
  }
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function getUserSearchInput() {
  // $('#js-shopping-list-search').submit(function(event){
  //   event.preventDefault();
  const userSearchString = $('.js-shopping-list-search').val(); 
  return userSearchString;
  // });
}

function filterSearchResults() {
  let filteredArray= []; 
  
  STORE.items.forEach(function(item) {
    if(item.name.includes(getUserSearchInput()) === true) {
      filteredArray.push(item);
    }
  });
  return filteredArray;
}

function handleItemSearch() {
  $('#js-shopping-list-search').submit(function(event){
    event.preventDefault();
    const shoppingListItemsString = generateShoppingItemsString(filterSearchResults());
    $('.js-shopping-list').html(shoppingListItemsString);
  });
}

function clearSearch(){
  $('#js-clear-search').submit(function(event){
    event.preventDefault();
    console.log('clear clicked');
    // renderShoppingList();
  //   event.preventDefault();
  //   renderShoppingList();
  });
}


function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteItem(itemIndex){
  console.log(`Deleting item at ${itemIndex} from list`);
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => { //thicc arrow
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItem(itemIndex);
    renderShoppingList();
  });
  console.log('`handleDeleteItemClicked` ran');
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleHideCompletedCheckboxClicked();
  handleItemSearch();
  getUserSearchInput();
  filterSearchResults();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);