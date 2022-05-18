import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { BooksModel } from "./books.model.js";
import { SellersModel } from "./bestsellers.model.js";

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
//create a route called /bestsellers that gets information
app.get('/bestsellers', async function(req, res) {
    //create a variable to hold a random set of 3 bestseller books
    const bestSellersList = await SellersModel.aggregate([
        {$sample: { size:3 }}
    ]);
    //if anything goes wrong let me know with a message otherwise tell me it was successful
    if(!bestSellersList) {
        res.status(500).json({message: 'failed to find best sellers'})
    } else {
        res.status(200).send(bestSellersList)
    }

})


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