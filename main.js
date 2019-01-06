//Button and Input grabs
var searchInput = document.querySelector(".search-bar");
var searchBtn = document.querySelector(".search-btn");
// var titleInput = document.querySelector(".title-input");
// var captionInput = document.querySelector(".caption-input");
var chooseBtn = document.querySelector(".choose-btn");
var favoriteBtn = document.querySelector(".favorite-btn");
var addBtn = document.querySelector(".add-btn");
var photoArea = document.querySelector(".photo-card-area");
var photoArray = [];

//Event Listeners
searchBtn.addEventListener('click', searchPhotos);
addBtn.addEventListener('click', createCard);
// favoriteBtn.addEventListener();

window.onload = function() {
  var keys = Object.keys(localStorage);
    keys.forEach (key =>{
    var parseObj = JSON.parse(localStorage.getItem(key));
    newPhoto = new Photo(parseObj.id, parseObj.title, parseObj.caption, parseObj.fav);
    photoArray.push(newPhoto);
    appendCard(newPhoto); 
  })
}

function createCard (event) {
  event.preventDefault();
  var titleInput = document.querySelector('.title-input');
  var captionInput = document.querySelector('.caption-input');
  const newPhoto = new Photo(Date.now(), titleInput.value, captionInput.value);
  if (captionInput.value !== "" && titleInput.value !== "") {
    newPhoto.saveToStorage();
    photoArray.push(newPhoto);
    appendCard(newPhoto);
  } else {
    alert('Please enter a photo title and caption.');
    return false;
  }
}

function appendCard(photo) {
  var card = 
    `<article class="card" data-id="${photo.id}">
      <header class="card-head">
        <h4 class="card-head-text">${photo.title}</h4>
      </header>
      <section class="card-pic"></section>
      <section class="card-body">
        <p class="card-body-text">${photo.caption}</p>
      </section>
      <footer class="card-foot">
        <img src="images/delete.svg" onclick="deleteCard(${photo.id})">
        <img src="images/favorite.svg">
      </footer>
    </article>`
    photoArea.innerHTML = card + photoArea.innerHTML;
}

function deleteCard (id) {
  let element = document.querySelector(`[data-id="${id}"]`);
  element.remove();
  let deleteIdea = photoArray.find(function(photo) {
    return id === photo.id;
  });
  deleteIdea.deleteFromStorage();
  let deleteIndex = photoArray.findIndex(function(photo) {
    return id === photo.id;
  });
  photoArray.splice(deleteIndex, 1)
}

function searchPhotos (event) {
  event.preventDefault();
  var searchWord = searchInput.value.toUpperCase();
  var filteredPhotos = photoArray.filter(function(obj) {
    var titleText = obj.title.toUpperCase();
    var captionText = obj.caption.toUpperCase();
    return titleText.includes(searchWord) || captionText.includes(searchWord);
  });
  photoArea.innerHTML = "";
  filteredPhotos.forEach(function(obj) {
    appendCard(obj)
  })
}



