import {Router, Request, Response, NextFunction} from "express";
import { handleUserSignUp, handleUserSignIn, handleUserAdds, handleGetAllData, handleDeleteData, handleShareLinkForMyBrain, handleGetAnothersBrain} from "../controllers/user"

import auth from "../middlewares/auth"
import envVars from "../config"

//zod for input validations
//bcrypt for password hashing
//cookieParser in parent file

const JWT_USER:string =  envVars.JWT_USER;

const userRouter = Router();

// userRouter.post("/signup",handleUserSignUp);    //this line of code generates an error because TS does type checks during compilation, so it constantly checks if the argumnet given to express application is application object or not, and this way of defining it is not, it is just a function handling request response objects of express app returning a promise
// It is missing some certain expected properties of application object like init, defaultconfiguration, engine etc.
//So wrapping it inside express applicationn object as expected by router


userRouter.post("/signup",(req:Request,res:Response)=>{
    handleUserSignUp(req,res);
});

userRouter.post("/signin",(req:Request,res:Response)=>{
    handleUserSignIn(req,res);
});

// AUTHENTICATED ENDPOINTS ------------------------------------------------------------------------
userRouter.use((req:Request,res:Response,next:NextFunction)=>{
    auth(req,res,next,JWT_USER);
});



//User Adds contents to Brainly App
userRouter.post("/add",(req:Request,res:Response)=>{
    handleUserAdds(req,res);
});

//fetching all user data [that they added]
userRouter.get("/content",(req:Request,res:Response)=>{
    handleGetAllData(req,res);
});

//deleting selected entry from user data
userRouter.delete("/content",(req:Request, res:Response)=>{
    handleDeleteData(req,res);
});

// create a shareable link for their profile
userRouter.post("/brain/share",(req:Request,res:Response)=>{
    handleShareLinkForMyBrain(req,res);
});

// fetching another users shared brain 
userRouter.get("/brain/:shareLink",(req:Request, res:Response)=>{
    handleGetAnothersBrain(req,res);
});


export default userRouter;