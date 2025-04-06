// SETUP CHECKS
/* 
console.log("Hello, World!");

console.log("These are new changes");
 */

// STARTING TO WRITE ACTUAL CODE ---------------------

import express from "express";
import dbConnect from "./dbConnect";
import userRouter from "./routers/user";
import adminRouter from "./routers/admin";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

export default app;

dbConnect();    

app.use(express.json());
app.use(cors({
    origin: "http://localhost:8000",
    credentials:true
}));
//accepting req submissions sent by forms application/x-www-form-urlencoded format
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin", adminRouter);


// app.listen(3000);  // done inside dbConnect function above


