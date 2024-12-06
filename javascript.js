const myLibrary = [];
const addBookButton = document.querySelector('.add-book button');
const dialog = document.querySelector('dialog');
const submitButton = document.querySelector('#submit');
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

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read))
}

function displayBooks(){
    const currentLibrary = document.querySelector('.library');
    const addBook = document.querySelector('.add-book');

    myLibrary.forEach((book) => currentLibrary
    .insertBefore(createDOMBook(book), addBook));
}

function displayLatestBook(){
    const book = myLibrary[myLibrary.length - 1];
    const currentLibrary = document.querySelector('.library');
    const addBook = document.querySelector('.add-book');
    currentLibrary
    .insertBefore(createDOMBook(book), addBook)
}

function createDOMBook(book){
    const newBook = document.createElement('div');
    newBook.className = 'book-card';
    
    const title = document.createElement('h3');
    const titleText = document.createTextNode(book.title);
    title.appendChild(titleText);
    
    const author = document.createElement('h4');
    const authorText = document.createTextNode(book.author);
    author.appendChild(authorText);

    const pages = document.createElement('p');
    const pagesText = document.createTextNode(`${book.pages} pages`);
    pages.appendChild(pagesText);
    
    const read = document.createElement('button');
    const hasRead = book.read ? 'Read' : 'Unread';
    read.id = hasRead.toLowerCase();
    const readText = document.createTextNode(`${hasRead}`);
    read.appendChild(readText);

    newBook.appendChild(title);
    newBook.appendChild(author);
    newBook.appendChild(pages);
    newBook.appendChild(read);

    return newBook;

}


addBookButton.addEventListener('click', () => dialog.showModal());
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const title = document.querySelector('#bookName');
    const author = document.querySelector('#bookAuthor');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('input[name="readRadios"]:checked');
    dialog.close();
    if(title.value != '' && author.value != '' && pages.value != '' && read){
        let readVal = read.value == 'Read' ? true : false;
        addBookToLibrary(title.value, author.value, pages.value, readVal);
        displayLatestBook();
        const book = [title, author, pages];
        book.forEach((elem) => elem.value = '');
        if(read) read.checked = false;
    }else{
        alert('Incomplete Information! Try again');
    }




})

addBookToLibrary('The Stand', 'Stephan Hawking', 1200, false);

displayBooks();
