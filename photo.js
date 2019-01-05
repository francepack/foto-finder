class Photo {
  constructor(id, title, caption, file) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    // this.file = file;
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }

  updatePhoto() {
    
  }
}