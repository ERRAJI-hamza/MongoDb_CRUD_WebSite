import  express  from "express";
import {connect} from "./server.js"
import { ObjectId } from "mongodb";
import  {getALLbooks, getbooks ,deletebooks} from "./books.js"
import cors from "cors";



const app = express();

app.use(cors({
    origin : "http://localhost:3000",
}));
app.use(express.json());

export const router = express.Router();

router.get('/',getALLbooks)
router.get('/f',getbooks);
router.delete('/d',deletebooks);

