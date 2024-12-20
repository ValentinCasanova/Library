const addBookButton = document.querySelector('.add-book button');
const dialog = document.querySelector('dialog');
const submitButton = document.querySelector('#submit');
dialog.close();


class Library {
    constructor (){
        this.myLibrary = [];
    }

    createBook(title, author, pages, read){
        const readAlr = read ? 'already read' : 'not read yet'
        const info = `${this.author} by ${this.author}, ${pages} pages, ${readAlr}`;
        return {title, author, pages, read, info};
    }

    addBookToLibrary(title, author, pages, read) {
        this.myLibrary.push(this.createBook(title, author, pages, read));
    }

    displayBooks(){
        const currentLibrary = document.querySelector('.library');
        const addBook = document.querySelector('.add-book');
    
        this.myLibrary.forEach((book) => currentLibrary
        .insertBefore(this.createDOMBook(book), addBook));
    }

    displayLatestBook(){
        const book = this.myLibrary[this.myLibrary.length - 1];
        const currentLibrary = document.querySelector('.library');
        const addBook = document.querySelector('.add-book');
        currentLibrary.insertBefore(this.createDOMBook(book), addBook);
    }

    createDOMBook(book){
        const newBook = document.createElement('div');
        newBook.className = `book-card ${book.title}`;
        
        const deleteButton = document.createElement('button');
        const deleteText = document.createTextNode('x');
        deleteButton.appendChild(deleteText);
        deleteButton.id = 'delete';
    
        deleteButton.addEventListener('click', () =>{
            newBook.remove();
        })
    
    
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
        read.className = `${book.title}`
        read.id = hasRead.toLowerCase();
        const readText = document.createTextNode(`${hasRead}`);
        read.addEventListener('click', () =>{
            read.id = read.id == 'unread' ? 'read' : 'unread';
            let newStatus = new String(read.id);
            newStatus = newStatus[0].toUpperCase() + newStatus.split('').splice(1, newStatus.length).join('');
            read.innerText = newStatus;
        })
        read.appendChild(readText);
    
        newBook.appendChild(deleteButton);
        newBook.appendChild(title);
        newBook.appendChild(author);
        newBook.appendChild(pages);
        newBook.appendChild(read);
    
        return newBook;
    }
}

const myLibrary = new Library();

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
        myLibrary.addBookToLibrary(title.value, author.value, pages.value, readVal);
        myLibrary.displayLatestBook();
        const book = [title, author, pages];
        book.forEach((elem) => elem.value = '');
        if(read) read.checked = false;
    }else{
        alert('Incomplete Information! Try again');
    }
    dialog.close();
})

myLibrary.displayBooks();
myLibrary.addBookToLibrary('The Stand', 'Stephan King', 1224, true);
myLibrary.displayLatestBook()
myLibrary.addBookToLibrary('A Song of Ice and Fire', 'George RR Martin', 600, false);
myLibrary.displayLatestBook()

