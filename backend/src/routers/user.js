import {Router} from "express";
import { handleUserSignUp, handleUserSignIn, handleUserAdds, handleGetAllData, handleDeleteData, handleShareLinkForMyBrain, handleGetAnothersBrain} from "../controllers/user"

import auth from "../middlewares/auth"
import envVars from "../config"

//zod for input validations
//bcrypt for password hashing
//cookieParser in parent file

const JWT_USER =  envVars.JWT_USER;

const userRouter = Router();

userRouter.post("/signup",handleUserSignUp);
userRouter.post("/signin",handleUserSignIn);

// authenticated endpoints-----------------------------------------------------
userRouter.use((req,res,next)=>{
    auth(req,res,next,JWT_USER);
});

//User Adds contents to Brainly App
userRouter.post("/add",handleUserAdds);

//fetching all user data [that they added]
userRouter.get("/content",handleGetAllData);

//deleting selected entry from user data
userRouter.delete("/content",handleDeleteData);

// create a shareable link for their profile
userRouter.post("/brain/share", handleShareLinkForMyBrain);

// fetching another users shared brain 
userRouter.get("/brain/:shareLink", handleGetAnothersBrain);


export default userRouter;