import { apiService as api } from "../api/api.service.js";

function refreshBooks() {
  api.get("bestsellers").then((data) => {
    data.forEach((book, index) => {
      let bookImage = document.getElementById(`image${index}`);
      let bookTitle = document.getElementById(`title${index}`);
      let bookAuthor = document.getElementById(`author${index}`);

      bookImage.src = book.imgUrl;
      bookTitle.innerHTML = book.title;
      bookAuthor.innerHTML = book.author;
    });
  });
}

window.onload = refreshBooks;

const button = document.getElementById("refresh-icon");

button.addEventListener("click", refreshBooks);


button.addEventListener('click', refreshBooks);

//Modals

const noteModal = document.querySelector("#noteModal");
const noteIcon = document.querySelector("#noteIcon");
const closeNoteModal = document.querySelector("#closeNoteModal");

noteIcon.onclick = function() {
  noteModal.style.display = "block";
}

closeNoteModal.onclick = function() {
  noteModal.style.display = "none";
}

window.addEventListener("click", function(event) {
    if (event.target == noteModal) {
        noteModal.style.display = "none";
    }
})

const newBookModal = document.querySelector("#newBookModal");
const newBookButton = document.querySelector("#newBookBtn");
const closeNewBookModal = document.querySelector("#closeNewBookModal");

newBookButton.onclick = function() {
  newBookModal.style.display = "block";
}

closeNewBookModal.onclick = function() {
  newBookModal.style.display = "none";
}

window.addEventListener("click", function(event) {
    if (event.target == newBookModal) {
    newBookModal.style.display = "none";
    }
})


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
    document.getElementById("refresh-icon").src = "../client/img/refresh-dark.png"
    document.getElementById("book-list-header").style.color = "white";
    document.getElementById("header-description").style.color = "#EAEAEA";
    document.getElementById("list-header").style.borderBottomColor = "#D8E2EB";
    document.getElementById("book-title").style.color = "white";
    document.getElementById("book-author").style.color = "white";
    document.getElementById("table-details").style.borderBottomColor = "#D8E2EB";
    document.getElementById("noteIcon").src = "../client/img/note-dark.png";
    document.getElementById("check").src = "../client/img/read-dark-default.png";
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
    console.log("bye")
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
    document.getElementById("table-details").style.borderBottomColor = "#003744";
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
