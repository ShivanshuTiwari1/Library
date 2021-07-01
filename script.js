let myLibrary = [];
let container = document.getElementById('container');

function Book(title, author, pages, read)
{
    this.title = title,
    this.author = author, 
    this.pages = pages, 
    this.read = read,
    this.info = function() {
        let retval = this.title + " by " + this.author + ", " + this.pages + " pages, ";
        
        if(read == true)
        {
            retval += "finished reading";
        }
        else
        {
            retval += "not read yet";    
        }
        return retval;
    }
}
Book.prototype.toggleReadStatus = function() {
    this.read = (this.read == true)?false:true;
}

function readtoggle(Event)
{
    let id = (Event.path[1].getAttribute('id'));
    let index = id.slice(1, id.length);
    myLibrary[index].toggleReadStatus();
    displayLibrary();
}
function removebook(Event)
{
    let id = (Event.path[1].getAttribute('id'));
    let index = id.slice(1, id.length);
    myLibrary.splice(index, 1);
    displayLibrary();
}

function addBookToLibrary(bookObj)
{
    myLibrary.push(bookObj);
    displayLibrary();
}

function displayLibrary()
{
    container.textContent = "";
    for(const [index,book] of myLibrary.entries())
    {
        let bookcontainer = document.createElement("div");
        bookcontainer.classList.add('bookcard');
        bookcontainer.id = "b"+index;
        
        let titlepara = document.createElement("p");
        titlepara.textContent = book.title;
        
        let authorpara = document.createElement("p");
        authorpara.textContent = book.author;
        
        let pagespara = document.createElement("p");
        pagespara.textContent = book.pages;
        
        let readbtn = document.createElement("button");
        readbtn.textContent = (book.read==true)?"Read":"Not Read";
        readbtn.addEventListener('click', readtoggle);
        
        let removebtn = document.createElement("button");
        removebtn.textContent = "Remove";
        removebtn.addEventListener('click', removebook);
        
        
        bookcontainer.appendChild(titlepara);
        bookcontainer.appendChild(authorpara);
        bookcontainer.appendChild(pagespara);
        bookcontainer.appendChild(readbtn);
        bookcontainer.appendChild(removebtn);
        
        container.appendChild(bookcontainer);
    }
}
// const b1 = new Book("The Hobbit", "Carlos", 426, true);
// const b2 = new Book("The Gentleman", "Enrico", 348, false);


// addBookToLibrary(b1);
// addBookToLibrary(b2);

// displayLibrary();

//Configuring modal
// Get the modal
let modal = document.getElementById("inputform");

// Get the button that opens the modal
let btn = document.getElementById("newbookbtn");

// When the user clicks on the button, open the modal
btn.onclick = function() 
{
  modal.style.display = "flex";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let submit = document.getElementById("submitbtn");
submit.onclick = function(Event)
{
    let form = document.getElementById('userform');
    Event.preventDefault();
    modal.style.display = "none";
    let iptitle = document.getElementById('bookname').value;
    let ipauthor = document.getElementById('authorname').value;
    let ippages = document.getElementById('pagesnum').value;
    let ipread = document.getElementById('readstatus').checked;
    
    form.reset();
    
    let obj = new Book(iptitle, ipauthor, ippages, ipread);
    addBookToLibrary(obj);
}