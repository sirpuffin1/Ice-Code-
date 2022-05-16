import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

const url= 'mongodb://localhost:27017/ice-code';

mongoose.connect(url).then(() => {
    console.log("connected to DB successfully");
}).catch((err) => {
    console.log("Failed to connect to DB", err);
});





app.get("/", (res, req) => {
    
})


app.listen(3001, ()=>{
console.log("server is running on port 3001");
})