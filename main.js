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
var reader = new FileReader();
var buttonCount = 0;
var favNum = document.querySelector(".fav-num");

//Event Listeners
searchInput.addEventListener('keyup', searchPhotos);
addBtn.addEventListener('click', createElement);
favoriteBtn.addEventListener('click', filterFavorites);
photoArea.addEventListener('click', updateText);


window.onload = function() {
  var keys = Object.keys(localStorage);
    keys.forEach (function(key) {
    var parseObj = JSON.parse(localStorage.getItem(key));
    newPhoto = new Photo(parseObj.id, parseObj.title, parseObj.caption, parseObj.file, parseObj.favorite);
    photoArray.push(newPhoto);
    appendCard(newPhoto); 
  })
    countFavorites();
    updateButtonCount();
}

function countFavorites() {
  photoArray.forEach(function(count) {
    if (count.favorite === true) {
    buttonCount += 1;
    }
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
    clearInput();
  } else {
    alert('Please enter a photo title and caption.');
    return false;
  }
}

function findIndexNumber(objId) {
  for (var i = 0; i < photoArray.length; i++) {
    if (photoArray[i].id === objId) {
      console.log(i);
      return i;
    }
  }
}

function changeFavorite(id) {
  var cardIndex = findIndexNumber(id);
  if (photoArray[cardIndex].favorite === false) {
    photoArray[cardIndex].favorite = true;
    event.target.src = "images/favorite-active.svg";
    photoArray[cardIndex].saveToStorage();
    buttonCount++;
    } else {
    photoArray[cardIndex].favorite = false;
    event.target.src = "images/favorite.svg";
    photoArray[cardIndex].saveToStorage();
    buttonCount--; 
    }
    updateButtonCount();
  }

function updateButtonCount() {
  favNum.innerHTML = buttonCount;
}

function filterFavorites(e) {
  if (favoriteBtn.innerHTML === 'View All') {
    clearCards();
    photoArray.forEach(function(photo) {
      appendCard(photo);
    })
    favoriteBtn.innerHTML = `View ${buttonCount} Favorites`;
    } else {
    e.preventDefault();
    clearCards();
    photoArray.forEach(function(photo) {
      trueCheck(photo);
    })
  }
}

function trueCheck(photo) {
  if (photo.favorite === true) {
    appendCard(photo);
    favoriteBtn.innerHTML = "View All"
  }
}

function appendCard(photo, fav) {
  var favoriteImg;
  if(photo.favorite === true) {
    favoriteImg = "images/favorite-active.svg";
  } else {
    favoriteImg = "images/favorite.svg";
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
        <img src="images/delete.svg" class="delete-img" onclick="deleteCard(${photo.id})">
        <img src="${favoriteImg}" class="favorite-img" onclick="changeFavorite(${photo.id})">
      </footer>
    </article>`
    photoArea.innerHTML = card + photoArea.innerHTML;
}

function deleteCard (id) {
  var result = confirm("Are you sure you want to delete this photograph?");
  if (result) {
    var element = document.querySelector(`[data-id="${id}"]`);
    element.remove();
    var deleteIdea = photoArray.find(function(photo) {
      return id === photo.id;
    });
    deleteIdea.deleteFromStorage();
    var deleteIndex = photoArray.findIndex(function(photo) {
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

function clearCards() {
  var allCards = document.querySelectorAll('.card');
  allCards.forEach(function(card) {
    card.remove();
  })
}

function clearInput() {
  titleInput.value = '';
  captionInput.value = '';
}

function updateText(e) {
  var cardIndex = findIndexNumber(parseInt(e.target.parentElement.parentElement.dataset.id));
  console.log(e.target.parentElement.parentElement.dataset.id);
    if (e.target.classList.contains('card-head-text')) {
      photoArray[cardIndex].updatePhoto(e.target.innerText, 'card-head-text');
    } else if (e.target.classList.contains('card-body-text')) {
      photoArray[cardIndex].updatePhoto(e.target.innerText, 'card-body-text');
    }
    photoArray[cardIndex].saveToStorage(photoArray);
}




//Couple JS ideas I may want to revisit


//idea for bottom bar event delegation    
// photoArea.addEventListener('click', function(e) {
//   if (e.target.classList.contains("delete-img")) {
//     deleteCard(e);
//   } else if (e.target.classList.contains("favorite-img")) {
//     changeFavorite(e);
//   }
// })    

//idea for enable/disable addbtn
// file.addEventListener('input', enableAdd)

// function enableAdd() {
//   if (file.value !== '') {
//     addBtn.disabled = false;
//   }
// }    

