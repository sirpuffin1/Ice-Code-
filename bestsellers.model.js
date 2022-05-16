import mongoose from "mongoose";

const bestsellersSchema = new mongoose.Schema({
   
    title:{
        type:String,
    },
    author:{
        type:String,
    },
    ImgUrl: {
        type:String
    }
});
export const BestsellersModel =mongoose.model('BestsellersModel',bestsellersSchema);
