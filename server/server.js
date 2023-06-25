import {router} from './router.js';
import  express  from "express";
import  {MongoClient}  from "mongodb";
import bodyParser from "body-parser"
import cors from "cors";



const app = express();
app.use(express.json());
const url = 'mongodb://localhost:27017/tp1';
app.use(cors({
  origin : "http://localhost:3000",
}));
app.use("/books",router);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


export async function connect() {
  let books = null;
  try {
    const conn = await MongoClient.connect(url);
    console.log('Connected successfully to server');
    const db = conn.db('tp1');
    books = db.collection('books');
  } catch (e) {
    console.log('Error: ' + e);
  } finally {
    return books;
  }
}


app.put('/update',async(req , res , next) => {
  let book = req.body;
  try {
      //console.log("body !  " +JSON.stringify(req.body));
      console.log(book);
      console.log(req.query.id);
      const books = await connect();
     // console.log(books);
      const result = await books.updateOne({ _id: parseInt(req.query.id) }, { $set: req.body});
      console.log(result)
      return res.status(200).json({ message: "book modifie"});
  } catch (e) {
      console.error('Error:', e);
  }
  });

app.listen(3016 , () => console.log('plan'));