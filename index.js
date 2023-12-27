import express from "express";
import { config } from "dotenv";

import { connectToDB} from "./config/dbConfig.js"
import courseRouter from "./routes/course.js";

config();//מאפשר לכתוב משתני סביבה בקובץ 
connectToDB();
//.env
const app = express();

app.use(express.json());

app.use("/api/courses",courseRouter)



let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})