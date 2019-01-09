class Photo {
  constructor(id, title, caption, file, favorite) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.file = file;
    this.favorite = favorite || false;
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }

  
  updatePhoto(newText, type) {
    if (type === 'card-head-text') {
      this.title = newText;
      } else if (type === 'card-body-text') {
          this.caption = newText;  
      }
    }
  }

  // updatePhoto(newText, classType) {
  //   this[classType] = newText;
  // }