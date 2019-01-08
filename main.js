//Button and Input grabs
var searchInput = document.querySelector(".search-bar");
var searchBtn = document.querySelector(".search-btn");
var titleInput = document.querySelector('.title-input');
var captionInput = document.querySelector('.caption-input');
var chooseBtn = document.querySelector(".choose-btn");
var favoriteBtn = document.querySelector(".favorite-btn");
var addBtn = document.querySelector(".add-btn");
var photoArea = document.querySelector(".photo-card-area");
var photoArray = [];
var favoriteImage = [];
var reader = new FileReader();

//Event Listeners
searchInput.addEventListener('keyup', searchPhotos);
addBtn.addEventListener('click', createElement);
// photoArea.addEventListener('click', function(e) {
//   if (e.target.classList.contains("delete-img")) {
//     deleteCard(e);
//   } else if (e.target.classList.contains("favorite-img")) {
//     changeFavorite(e);
//   }
// }) 

//idea for bottom bar event delegation           

window.onload = function() {
  var keys = Object.keys(localStorage);
    keys.forEach (key =>{
    var parseObj = JSON.parse(localStorage.getItem(key));
    newPhoto = new Photo(parseObj.id, parseObj.title, parseObj.caption, parseObj.file, parseObj.favorite);
    photoArray.push(newPhoto);
    appendCard(newPhoto); 
  })
}

function createElement(e) {
  if (file.files[0]) {
    reader.readAsDataURL(file.files[0]); 
    reader.onload = createCard;
  }
}

function createCard (e) {
  e.preventDefault();
  const newPhoto = new Photo(Date.now(), titleInput.value, captionInput.value, e.target.result);
  if (captionInput.value !== "" && titleInput.value !== "") {
    newPhoto.saveToStorage();
    photoArray.push(newPhoto);
    appendCard(newPhoto);

  } else {
    alert('Please enter a photo title and caption.');
    return false;
  }
}

// function changeFavorite() {
//   if (this.favorite === false) {
//     console.log(15);
//     element.src = "images/favorite-active.svg"
//   }
// }


function appendCard(photo, fav) {
  var favoriteImg;
  if(photo.favorite === true){
    favoriteImg = "images/favorite-active.svg"
  } else {
    favoriteImg = "images/favorite.svg"
  }
  var card = 
    `<article class="card" data-id="${photo.id}">
      <header class="card-head">
        <h4 class="card-head-text" contenteditable="true">${photo.title}</h4>
      </header>
      <section class="card-pic"><img src="${photo.file}" class="card-img"></section>
      <section class="card-body">
        <p class="card-body-text" contenteditable="true">${photo.caption}</p>
      </section>
      <footer class="card-foot">
        <img src="images/delete.svg" class="delete-img" 
        onclick="deleteCard(${photo.id})"
        >
        <img src="${favoriteImg}" class="favorite-img">
      </footer>
    </article>`
    photoArea.innerHTML = card + photoArea.innerHTML;
}

function deleteCard (id) {
  var result = confirm("Are you sure you want to delete this photograph?");
  if (result) {
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
}

function searchPhotos (e) {
  e.preventDefault();
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

//Travis code
// var create = document.querySelector('.add-btn');
// var input = document.querySelector('.choose-file-btn');
// var photoSection = document.querySelector('.card-pic');
// var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];


// window.addEventListener('load', appendPhotos);
// create.addEventListener('click', createElement);

// function appendPhotos() {
//   imagesArr.forEach(function (photo) {
//     photoSection.innerHTML += `<img src=${photo.file} />`
//   })
// }

// function addPhoto(e) {
//   console.log(e.target.result);
//   var newPhoto = new Photo(Date.now(), e.target.result);
//   photoSection.innerHTML += `<img src=${e.target.result} />`;
//   imagesArr.push(newPhoto)
//   newPhoto.saveToStorage(imagesArr)
// }


