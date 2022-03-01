import express from "express";
import cors from "cors";
import helmet from "helmet";

require("dotenv").config();
const zomato = express();

//Establish Database Connection
mongoose.connect(
    process.env.MONGO_URL
).then(()=> console.log("Connection Established!!!"));

zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(helmet());
zomato.use(cors());

zomato.get("/", (req,res) => res.json({message: "Setup Success Yay!!"}));

zomato.listen(4000, () => console.log("Server is up and running"));