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
// searchBtn.addEventListener();
// chooseBtn.addEventListener();
addBtn.addEventListener('click', createCard);
// favoriteBtn.addEventListener();

// window.onload = function() {
//   var keys = Object.keys(localStorage);
//     keys.forEach (key =>{
//     var parseObj = JSON.parse(localStorage.getItem(key));
//     newCard = new Photo(parseObj.id, parseObj.title, parseObj.caption, parseObj.fav);
//     photoArray.push(newPhoto);
//     appendCard(newPhoto); 
//   })
// }

function createCard (event) {
  event.preventDefault();
  var titleInput = document.querySelector('.title-input');
  var captionInput = document.querySelector('.caption-input');
  const newPhoto = new Photo(Date.now(), titleInput.value, captionInput.value)
  newPhoto.saveToStorage();
  photoArray.push(newPhoto);
  appendCard(newPhoto);
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
        <img src="images/delete.svg">
        <img src="images/favorite.svg">
      </footer>
    </article>`
    photoArea.innerHTML = card + photoArea.innerHTML;
}



