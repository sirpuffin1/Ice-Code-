import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from 'path'
import { BooksModel } from "./books.model.js";
import { SellersModel } from "./bestsellers.model.js";

import dotenv from "dotenv";
const __dirname = path.resolve();

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

const clientPath = path.join(__dirname, "/client");
app.use(express.static(clientPath));


const url= process.env.DATABASE_URL;

mongoose.connect(url).then(() => {
    console.log("connected to DB successfully");
}).catch((err) => {
    console.log("Failed to connect to DB", err);
});

app.get('/', (req, res, next) => {

  res.status(200).json({
      status: 'success',
      data: {
          name: 'Ice Code Library',
          version: '0.1.0'
      }
  });

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



//Delete book by title
app.delete("/delete-book/:title", function (req, res) {
    const t = req.body.title;
    BooksModel.findOneAndDelete({title: req.params.title}).then((data) => {
      res.json({ data });
    });
  });

//update book by title
app.put("/update-book/:title", function (req, res) {
  console.log(req.params.title);
    BooksModel.findOneAndUpdate(
     {title : req.params.title},
     {
       $set: {
         note: req.body.note,
       },
     },
     {
       new: true,
     },
     function (err, updateBook) {
       if (err) {
         res.send("Error Updating Book");
       } else {
         res.json(updateBook);
       }
     }
   );
 });

 app.put("/update-books-read/:title", function (req, res) {
  console.log(req.params.title);
    BooksModel.findOneAndUpdate(
     {title : req.params.title},
     {
       $set: {
         isRead: !(req.body.isRead),
       },
     },
     {
       new: true,
     },
     function (err, updateBook) {
       if (err) {
         res.send("Error Updating Book");
       } else {
         res.json(updateBook);
       }
     }
   );
 });

 app.all("*", function (req, res) {
  const filePath = path.join(__dirname, '/client/index.html');
  console.log(filePath);
  res.sendFile(filePath);
});


//  var port_number = server.listen(process.env.PORT || 3001);
// app.listen(port_number);
app.listen(process.env.PORT || 3001, ()=>{
console.log("server is running on port 3001");

})