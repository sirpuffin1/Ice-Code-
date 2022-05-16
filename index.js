import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { BooksModel } from "./books.model.js";


const app = express();
app.use(cors());

app.use(express.json());

const url= 'mongodb://localhost:27017/ice-code';

mongoose.connect(url).then(() => {
    console.log("connected to DB successfully");
}).catch((err) => {
    console.log("Failed to connect to DB", err);
});


app.get('/book', async function (req, res) {
    const bookList = await BooksModel.find();
    res.send(bookList);
 });



app.listen(3001, ()=>{
console.log("server is running on port 3001");
})