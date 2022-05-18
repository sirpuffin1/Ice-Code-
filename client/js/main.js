import { apiService as api } from '../api/api.service.js';
api.get('bestsellers').then(data => {
    data.forEach((book, index) => {
        console.log(index)
        let bookImage = document.getElementById(`image${index}`)
        let bookTitle = document.getElementById(`title${index}`)
        let bookAuthor = document.getElementById(`author${index}`)
        
        bookImage.src=book.imgUrl
        bookTitle.innerHTML = book.title
        bookAuthor.innerHTML = book.author
    })
})