import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
    id: {
        type:Number,
    },
    title:{
        type:String,
    },
    isbn:{
      type:Number,
    },
    author:{
        type:String,
    },
    ImgUrl: {
        type:String
    }
});
export const BooksModel =mongoose.model('BooksModel',booksSchema);
