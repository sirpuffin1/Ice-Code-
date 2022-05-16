import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { BooksModel } from "./books.model.js";

import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

const url= process.env.DATABASE_URL;

mongoose.connect(url).then(() => {
    console.log("connected to DB successfully");
}).catch((err) => {
    console.log("Failed to connect to DB", err);
});


app.get('/book', async function (req, res) {
    const bookList = await BooksModel.find();
    res.send(bookList);
 });


 app.post('/book', async function (req, res) {
    const {title, author,note} = req.body;
    const bookList = await BooksModel({
        title, author,note
    });
    bookList.save()
    .then((data) => {
        res.json({data});
    })
    .catch(err => {
        res.status(501);
        res.json({errors: err});
    })
});



app.listen(3001, ()=>{
console.log("server is running on port 3001");
})