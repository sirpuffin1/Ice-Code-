import { apiService as api } from '../api/api.service.js';

function refreshBooks() {
    api.get('bestsellers').then(data => {
        data.forEach((book, index) => {

            let bookImage = document.getElementById(`image${index}`)
            let bookTitle = document.getElementById(`title${index}`)
            let bookAuthor = document.getElementById(`author${index}`)
            
            bookImage.src=book.imgUrl
            bookTitle.innerHTML = book.title
            bookAuthor.innerHTML = book.author
        })
    })
}

window.onload = refreshBooks;

const button = document.getElementById('refresh-icon');

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