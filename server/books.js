 import {connect} from "./server.js"
import { ObjectId } from "mongodb";
import {router} from './router.js';
import  express  from "express";
import  {MongoClient}  from "mongodb";
import bodyParser from "body-parser"
import cors from "cors";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


export const getALLbooks = async(req , res , next) => {
     let result = null;
     let jsonArray = null;
     try {
         const books = await connect();
         //console.log(books);
         result = books.find({}).limit(6);
         const docsArray = await result.toArray();
         jsonArray = docsArray.map((doc) => JSON.parse(JSON.stringify(doc)));
         //console.log(jsonArray)
     } catch (e) {
          console.error('Error:', e);
     }
     if(!result){
         return res.status(404).json({ message: "no book found"});
     }
     return res.status(200).json(jsonArray);
 }

export const getbooks = async(req , res) => {
    console.log(2);
    const title = req.query.title;
    const categories = req.query.categories;
    const authors = req.query.authors;
    const date = req.query.date;
    let result = null;
    let jsonArray = null;
    try {
        const books = await connect();
        console.log(books);
        result = books.find({title:{ $regex: title} ,authors: {$regex : authors} , categories :{$regex: categories} , "publishedDate.date":{$regex: date}});
        const docsArray = await result.toArray();
        jsonArray = docsArray.map((doc) => JSON.parse(JSON.stringify(doc)));
       console.log(jsonArray)
    } catch (e) {
        console.log(4);
        console.error('Error:', e);
    }
    if(!result){
       console.log(3)
       return res.status(404).json({ message: "no book found"});
    }
   return res.status(200).json(jsonArray);
}

export const deletebooks = async(req , res , next) => {
  try {
      console.log(req.query.id);
      const books = await connect();
      const result = await books.deleteOne({ _id: parseInt(req.query.id) });
      console.log(result)
      return res.status(200).json({ message: "book deleted"});
  } catch (e) {
      console.error('Error:', e);
  }
  }
