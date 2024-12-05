const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function(){
    let read = this.read ? 'already read' : 'not read yet'
    let info = `${this.author} by ${this.author}, ${pages} pages, ${read}`;
    return info;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}
