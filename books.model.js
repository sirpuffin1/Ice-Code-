import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
   
    title:{
        type:String,
    },
    author:{
        type:String,
    },
    note: {
        type:String
    }
});
export const BooksModel =mongoose.model('BooksModel',booksSchema);
