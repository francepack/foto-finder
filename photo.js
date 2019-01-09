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

  // updatePhoto(text, type) {
  //   this[type] = text;
  // }
  updatePhoto(newText) {
    if (type === 'card-head-text') {
      this.title = newText;
      } else if (type === 'card-caption-text') {
          this.caption = newText;  
     }  
  }
}