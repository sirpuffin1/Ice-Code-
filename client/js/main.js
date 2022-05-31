import { apiService as api } from "../api/api.service.js";



function refreshBooks() {
  api.get("bestsellers").then((data) => {
    data.forEach((book, index) => {
      let bookImage = document.getElementById(`image${index}`);
      let bookTitle = document.getElementById(`title${index}`);
      let bookAuthor = document.getElementById(`author${index}`);

      const upperCaseFirstLetter = string =>
      `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;
     
     const lowerCaseAllWordsExceptFirstLetters = string =>
      string.replaceAll(/\S*/g, word =>
       `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`
      );

      bookImage.src = book.imgUrl;
      bookTitle.innerHTML = upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(book.title));
      bookAuthor.innerHTML = book.author;
    });
  });
}
function createBook() {
  console.log("helloo connected");
  let bookTitle = document.getElementById("addTitle").value;
  let bookAuthor = document.getElementById("addAuthor").value;
  console.log(bookTitle);

  api
    .post("book", {
      title: bookTitle,
      author: bookAuthor,
      note: "",
    })
    .then((data) => console.log(data));
    let tableContainer = document.getElementById("table-details-container");
  while (tableContainer.firstChild) {
    tableContainer.removeChild(tableContainer.firstChild);
  }
  let showy = setTimeout(showBooks, 100);
}

function updateNotes(number, string) {
  let updateNotesText = document.getElementById(`noteModalInput${number}`)
  console.log(updateNotesText, string )
  api.put(`update-book/${string}`, {
    note: updateNotesText.value
  })
  .then((data) => console.log(data))
  let tableContainer = document.getElementById("table-details-container");
  while (tableContainer.firstChild) {
    tableContainer.removeChild(tableContainer.firstChild);
  }
  showBooks();
}



function noteModalfun(number) {
  const noteModaFrag = document.getElementById(`noteModal${number}`);

  noteModaFrag.style.display = "block";
}


function showBooks() {
  api.get("book").then((data) => {
    data.forEach((book, index) => {
      
      console.log(book.title);
      let tableDetails = document.createElement('div');
      let bookDetails = document.createElement('div');
      let tableDetailsContainer = document.getElementById('table-details-container');
      let tableRight = document.createElement('div');
      let noteModalContainer = document.getElementById('noteModalContainer');
      
      let noteModal = document.createElement('div')
      noteModal.id = `noteModal${index}`
      noteModal.className = 'modal'

      let noteModalBox = document.createElement('div');
      noteModalBox.className = 'notemodal-box'

      let closeIconSpan = document.createElement('span');
      closeIconSpan.className = 'closeicon-span'
      let closeImage = document.createElement('img');
      closeImage.src = "../client/img/close.png"
      closeImage.id = "closeNoteModal"
      closeImage.className = "close-icon"
      closeImage.addEventListener('click', function() {
        noteModal.style.display = "none";
      })
      closeIconSpan.appendChild(closeImage);

      let modalHeader = document.createElement('h3');
      modalHeader.className = "modal-header";
      modalHeader.innerHTML = "Notes";

      let modalInput = document.createElement('textarea')
      modalInput.id = `noteModalInput${index}`;
      modalInput.className = "notemodal-input"
      

      noteModalBox.appendChild(closeIconSpan);
      noteModalBox.appendChild(modalHeader)
      noteModalBox.appendChild(modalInput)

      let noteButtonSpan = document.createElement('span');
      noteButtonSpan.className = 'button-span'
      let modalButton = document.createElement('button')
      modalButton.className = 'modal-button'
      modalButton.innerHTML = "Save"
      modalButton.id = `modalButton${index}`
      modalButton.addEventListener('click', function() {
        updateNotes(index, book.title)
      })
      noteButtonSpan.appendChild(modalButton)
      noteModalBox.appendChild(noteButtonSpan)

      noteModal.appendChild(noteModalBox)
      noteModalContainer.appendChild(noteModal)

      bookDetails.className = 'book-details'; 
      let bookTitle = document.createElement('p');
      bookTitle.id = 'book-title'
      bookTitle.className = `bookTitleClass${index}`
      bookTitle.innerHTML = book.title

      let bookAuthor = document.createElement('p');
      bookAuthor.id = 'book-author'
      bookAuthor.className = `bookAuthorClass${index}`
      bookAuthor.innerHTML = book.author

      tableRight.className = 'right-table'

      let noteIcon = document.createElement('img');
      noteIcon.id = 'noteIcon';
      noteIcon.className = `note-icon${index}`;
      noteIcon.setAttribute('src', '../client/img/note.png')
      noteIcon.addEventListener('click', function() {
        modalInput.value = book.note
        noteModalfun(index)
        
      })
      tableRight.appendChild(noteIcon)
      window.addEventListener("click", function (event) {
        if (event.target == noteModal) {
          noteModal.style.display = "none";
        }
      });

      let readIcon = document.createElement('img');
      readIcon.id = 'check';
      readIcon.className = `read-icon${index}`
      if(book.isRead == false) {
        readIcon.setAttribute('src', '../client/img/read-default.png');
      } else {
        readIcon.setAttribute('src', '../client/img/read-green.png');
      }
      // readIcon.setAttribute('src', '../client/img/read-default.png');
      readIcon.addEventListener('click', function() {
        readUnread(index)
      })
      tableRight.appendChild(readIcon)

      let trashIcon = document.createElement('img');
      trashIcon.id = 'trashbin';
      trashIcon.className = `trash-icon${index}`
      trashIcon.setAttribute('src', '../client/img/remove.png');
      tableRight.appendChild(trashIcon)

      bookDetails.appendChild(bookTitle);
      bookDetails.appendChild(bookAuthor)

      tableDetails.appendChild(bookDetails)
      tableDetails.appendChild(tableRight)

      tableDetails.id = 'table-details'
      tableDetailsContainer.appendChild(tableDetails)
    });
  });
}
refreshBooks()
showBooks()

const button = document.getElementById("refresh-icon");

const submitBookButton = document.getElementById("submitBook");
submitBookButton.addEventListener("click", createBook);

button.addEventListener("click", refreshBooks);

//Modals


const noteIcon = document.querySelector("#noteIcon");
// const closeNoteModal = document.querySelector("#closeNoteModal");

// closeImage.onclick = 


// window.addEventListener("click", function (event) {
//   if (event.target == noteModal) {
//     noteModal.style.display = "none";
//   }
// });

const newBookModal = document.querySelector("#newBookModal");
const newBookButton = document.querySelector("#newBookBtn");
const closeNewBookModal = document.querySelector("#closeNewBookModal");


newBookButton.addEventListener("click", function () {
  newBookModal.style.display = "block";
});

closeNewBookModal.onclick = function () {
  newBookModal.style.display = "none";
};

window.addEventListener("click", function (event) {
  if (event.target == newBookModal) {
    newBookModal.style.display = "none";
  }
});

// Dark-mode toggle
let light = false;

document.getElementById("light-icon").addEventListener("click", function () {
  let toggle = document.getElementById("light-icon");

  light = !light;

  if (light === true) {
    toggle.src = "../client/img/lightToggle-dark.png";
    console.log("hello");
    document.getElementById("header").style.background = "#323F4B";
    document.getElementById("shelf-container").style.background = "#323F4B";
    document.body.style.background = "#1F2933";
    document.getElementById("site-name").style.color = "white";
    document.getElementById("shelf").id = "shelf-dark";
    document.getElementById("refresh-icon").src =
      "../client/img/refresh-dark.png";
    document.getElementById("book-list-header").style.color = "white";
    document.getElementById("header-description").style.color = "#EAEAEA";
    document.getElementById("list-header").style.borderBottomColor = "#D8E2EB";
    document.getElementById("book-title").style.color = "white";
    document.getElementById("book-author").style.color = "white";
    document.getElementById("table-details").style.borderBottomColor =
      "#D8E2EB";
    document.getElementById("noteIcon").src = "../client/img/note-dark.png";
    document.getElementById("check").src =
      "../client/img/read-dark-default.png";
    document.getElementById("trashbin").src = "../client/img/remove-dark.png";
    document.getElementById("details").style.color = "white";
    document.getElementById("notes").style.color = "white";
    document.getElementById("read").style.color = "white";
    document.getElementById("remove").style.color = "white";
    document.getElementById("table-header").style.borderBottomColor = "#D8E2EB";
    document.getElementById("footer").style.background = "#323F4B";
    document.getElementById("newBookBtn").style.background = "#3BD3BD";
    document.getElementById("newBookBtn").style.color = "#1F2933";
    document.querySelector(".bookmodal-box").style.background = "#52606D";
    document.querySelector(".modal-header").style.color = "white";
    document.querySelector(".notemodal-box").style.background = "#52606D";

    let close = document.querySelectorAll(".close-icon");
    for (let i = 0; i < close.length; i++) {
      close[i].src = "../client/img/close-dark.png";
    }

    let modalHeader = document.querySelectorAll(".modal-header");
    for (let i = 0; i < modalHeader.length; i++) {
      modalHeader[i].style.color = "white";
    }

    let noteModalInput = document.querySelectorAll(".notemodal-input");
    for (let i = 0; i < noteModalInput.length; i++) {
      noteModalInput[i].style.background = "#9AA5B1";
    }

    let modalBtn = document.querySelectorAll(".modal-button");
    for (let i = 0; i < modalBtn.length; i++) {
      modalBtn[i].style.background = "#3BD3BD";
      modalBtn[i].style.color = "#1F2933";
    }

    let bookModalInput = document.querySelectorAll(".bookmodal-input");
    for (let i = 0; i < bookModalInput.length; i++) {
      bookModalInput[i].style.background = "#9AA5B1";
    }

    let modalText = document.querySelectorAll(".modal-text");
    for (let i = 0; i < modalText.length; i++) {
      modalText[i].style.color = "white";
    }

    let bookCover = document.querySelectorAll(".book-cover");
    for (let i = 0; i < bookCover.length; i++) {
      bookCover[i].className = "book-cover-dark";
    }
    let bookOverlay = document.querySelectorAll(".book-overlay");
    for (let i = 0; i < bookOverlay.length; i++) {
      bookOverlay[i].className = "book-overlay-dark";
    }
    let bookTitle = document.querySelectorAll(".book-cover-title");
    for (let i = 0; i < bookTitle.length; i++) {
      bookTitle[i].className = "book-cover-title-dark";
    }
    let bookAuthor = document.querySelectorAll(".book-cover-author");
    for (let i = 0; i < bookAuthor.length; i++) {
      bookAuthor[i].className = "book-cover-author-dark";
    }
  } else {
    console.log("bye");
    toggle.src = "../client/img/lightToggle.png";
    document.getElementById("header").style.background = "#f1ece0";
    document.body.style.background = "none";
    document.getElementById("shelf-container").style.background = "#f1ece0";
    document.getElementById("site-name").style.color = "#003744";
    document.querySelector(".book-cover-dark").className = "book-cover";
    document.getElementById("shelf-dark").id = "shelf";
    document.getElementById("refresh-icon").src = "../client/img/refresh.png";
    document.getElementById("book-list-header").style.color = "black";
    document.getElementById("header-description").style.color = "#404040";
    document.getElementById("list-header").style.borderBottomColor = "#003744";
    document.getElementById("book-title").style.color = "black";
    document.getElementById("book-author").style.color = "#404040";
    document.getElementById("table-details").style.borderBottomColor =
      "#003744";
    document.getElementById("noteIcon").src = "../client/img/note.png";
    document.getElementById("check").src = "../client/img/read-default.png";
    document.getElementById("trashbin").src = "../client/img/remove.png";
    document.getElementById("details").style.color = "#5f5f5f";
    document.getElementById("notes").style.color = "#5f5f5f";
    document.getElementById("read").style.color = "#5f5f5f";
    document.getElementById("remove").style.color = "#5f5f5f";
    document.getElementById("table-header").style.borderBottomColor = "#003744";
    document.getElementById("footer").style.background = "#003744";
    document.getElementById("newBookBtn").style.background = "#003744";
    document.getElementById("newBookBtn").style.color = "white";
    document.querySelector(".bookmodal-box").style.background = "#D8E2EB";
    document.querySelector(".bookmodal-input").style.backgroundColor = "white";
    document.querySelector(".notemodal-box").style.background = "#D8E2EB";

    let close = document.querySelectorAll(".close-icon");
    for (let i = 0; i < close.length; i++) {
      close[i].src = "../client/img/close.png";
    }

    let modalHeader = document.querySelectorAll(".modal-header");
    for (let i = 0; i < modalHeader.length; i++) {
      modalHeader[i].style.color = "#404040";
    }

    let modalBtn = document.querySelectorAll(".modal-button");
    for (let i = 0; i < modalBtn.length; i++) {
      modalBtn[i].style.background = "#003744";
      modalBtn[i].style.color = "white";
    }

    let bookModalInput = document.querySelectorAll(".bookmodal-input");
    for (let i = 0; i < bookModalInput.length; i++) {
      bookModalInput[i].style.background = "white";
    }

    let modalText = document.querySelectorAll(".modal-text");
    for (let i = 0; i < modalText.length; i++) {
      modalText[i].style.color = "#404040";
    }

    let bookCoverDark = document.querySelectorAll(".book-cover-dark");
    for (let i = 0; i < bookCoverDark.length; i++) {
      bookCoverDark[i].className = "book-cover";
    }
    let bookOverlayDark = document.querySelectorAll(".book-overlay-dark");
    for (let i = 0; i < bookOverlayDark.length; i++) {
      bookOverlayDark[i].className = "book-overlay";
    }
    let bookTitleDark = document.querySelectorAll(".book-cover-title-dark");
    for (let i = 0; i < bookTitleDark.length; i++) {
      bookTitleDark[i].className = "book-cover-title";
    }
    let bookAuthorDark = document.querySelectorAll(".book-cover-author-dark");
    for (let i = 0; i < bookAuthorDark.length; i++) {
      bookAuthorDark[i].className = "book-cover-author";
    }
  }
});

// Read/Unread


let read = false;
function readUnread(number) {
  let readButton = document.querySelector(`.read-icon${number}`);
  let bookTitler = document.querySelector(`.bookTitleClass${number}`).innerHTML
 
  read = !read;
  if (read === true) {
    readButton.src = "../client/img/read-green.png";
  } else {
    readButton.src = "../client/img/read-default.png";
  }


  api.put(`update-books-read/${bookTitler}`, {
    isRead: !read
  })
  .then((data) => console.log(data))
}
