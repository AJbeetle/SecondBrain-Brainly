import {Request, Response, NextFunction} from "express"
import {z} from "zod"
import bcrypt from "bcrypt"
import jwt, {JwtPayload} from "jsonwebtoken";
import {nanoid} from "nanoid"

// import db from "../models/dbSchema"
// const {UserModel, ContentModel, ShareModel, TagModel} = db;

//Using Strictly types TS dbSchema 
import db from "../models/dbVeryStrict"

const {UserModel, ContentModel, ShareModel, TagModel} = db;
import {UserI} from "../models/dbVeryStrict"

import envVars from "../config"

const userSecret = envVars.JWT_USER;

//POST REQUEST
export async function handleUserSignUp(req:Request,res:Response){
    try{
        const requiredData = z.object({
            username:z.string().min(3).max(10,{message:"username should be of length 3-10"}),
            email: z.string().email({message:"invalid email"}),
            password:z.string()
                      .min(8)
                      .max(20,{message:"password should be of 8-20 letters"})
                      .regex(/[0-9]/,{message:"atleast one number required"})
                      .regex(/[a-z]/,{message:"atleaset one lowercase letter required"})
                      .regex(/[A-Z]/,{message:"atleast one uppercase letter required"})
                      .regex(/[!@#$%^&*()-><]/,{message:"atleast one special character needed"})
                      ,
            firstName:z.string().max(20),
            middleName:z.string().max(20).optional(),
            lastName:z.string().max(20).optional()
        })
    
        type zodCheckType = z.infer<typeof requiredData>;
    
        const parseWithSuccess = requiredData.safeParse(req.body);
    
        if(!parseWithSuccess.success){
            return res.status(411).json({
                err : "inputs are invalid",
                errorIncomp : parseWithSuccess.error,
                errorComp : parseWithSuccess.error.errors,
                // result : false
            })
        }
    
        const {username, email, password, firstName, middleName, lastName} :zodCheckType = req.body;
    
        const userAlreadyExist = await UserModel.findOne({
            username
        }) 
    
        if(userAlreadyExist){
            return res.status(403).json({
                err : "user with this username already exists",
                // result : false
            })
        }

        //Hashing password before sending to the database
        const hashedPass = await bcrypt.hash(password,10);
    
        await UserModel.create({
            username,
            email,
            password : hashedPass,
            firstName,
            middleName,
            lastName
        })
    
        return res.status(200).json({
            message : "successfully signed up, now login to use our services"
        })
    }
    catch(e:any){
        console.log(`INTERNAL SERVER ERRORS : ${e.message}`)
        return res.status(500).json({
            err : "internal server error"
        })
    }
}

//POST REQUEST
export async function handleUserSignIn(req:Request,res:Response,){
    try{
        const requiredBody = z.object({
            username: z.string().min(3).max(10,{message:"correct Username lengths between 3-10"}),
            password: z.string().min(8).max(20,{message:"password should be of 8-20 letters"})
            .regex(/[0-9]/,{message:"atleast one number required"})
            .regex(/[a-z]/,{message:"atleaset one lowercase letter required"})
            .regex(/[A-Z]/,{message:"atleast one uppercase letter required"})
            .regex(/[!@#$%^&*()-><]/,{message:"atleast one special character needed"})
        })
    
        const {success, error} = requiredBody.safeParse(req.body);
        type zodValidationType = z.infer<typeof requiredBody>;
    
        if(!success){
            return res.status(411).json({
                err : "inputs are invalid",
                errorComp : error.errors
            })
        }
    
        const {username, password} : zodValidationType = req.body;
    
        const userExists = await UserModel.findOne({
            username
        }) 
    
        if(userExists){
            const passMatch = await bcrypt.compare(password, userExists.password);
            if(passMatch){
    
                const token: string = jwt.sign({
                    id : userExists._id,
                    authorized:"user"
                },userSecret,{expiresIn: "1h"})
    
                const expiryTimeForCookie : Date = new Date(new Date().getTime() + 60*60*1000);
    
                res.cookie("AuthCookie",`Bearer ${token}`,{
                    httpOnly:true,
                    secure:false,
                    sameSite:"none",
                    expires:expiryTimeForCookie
                })
    
                return res.status(200).json({
                    message : "successfully signed in. AuthCookie is sent"
                })
            }
            else{
                return res.status(403).json({
                    err : "Invalid Password"
                })
            }
        }
        else{
            return res.status(403).json({
                err : "Invalid Username"
            })
        }

    }
    catch(e:any){
        console.log(`ERROR OCCURED : ${e.message}`);
        return res.status(500).json({
            err : "Internal Server Error"
        })
    }

    

}

// AUTHENTICATED HANDLERS ---------------------------------------------------------

//POST REQUEST
export async function handleUserAdds(req:Request, res:Response){

    try{
        // NOT DOING INPUT VALIDATIONS HERE : make sure forntend do proper checks if the correct data is getting sent to backend
    
        type requiredObject = {
            title : string,
            link : string,
            type : string,
            tags : string[]
        }
    
        const {title, link, type, tags} :requiredObject = req.body;
        const userId = req.id;
    
        const newContent = await ContentModel.create({
            userId,
            title,
            link,
            type,
            tags
        })
    
        async function addTags(arr:string[]){
            for (const e of arr){
    
                const foundTag = await TagModel.findOne({
                    tagName :e
                })
    
                if(!foundTag){
                    await TagModel.create({
                        tagName : e
                    })
                }
            }
        }
    
        if(tags.length>0){
            addTags(tags);
        }
    
        res.status(200).json({
            message : "content added to database",
            contentId : newContent._id
        })


    }
    catch(e:any){
        console.log(`ERRORS OCCURED : ${e.message}`);
        return res.status(500).json({
            message : "internal server error"
        })
    }

}

//GET REQUEST
export async function handleGetAllData(req:Request, res:Response){
    //Do input validations in frontend

    try{
        const userId = req.id;
        const findAll = await ContentModel.find({
            userId : userId
        });
    
        return res.status(200).json({
            message : "All contents fetched",
            contents : findAll
        })

    }
    catch(e:any){
        console.log(`ERROR OCCURED : ${e.message}`);
        return res.status(500).json({
            err : "Internal Server Error"
        })
    }



}

//DELETE REQUEST
export async function handleDeleteData(req:Request, res:Response){
    try{
        const contentId = req.query.id as string;  //type assertion
        const userId = req.id;
    
        //here you need to do authorization check. So if your backend API is exposed no other user can delete other persons content [if they get contentId somehow]
    
        const authorizedOrNot = await ContentModel.findOne({
            userId,
            _id:contentId
        })

        if(!authorizedOrNot){
            return res.status(400).json({
                err : "You are not authorized to delete someone else's content"
            })
        }

        const deletedOrNot = await ContentModel.deleteOne({
            userId,
            _id : contentId
        })
    
        res.status(200).json({
            message : `delted ${deletedOrNot.deletedCount} document from database`
        })

    }
    catch(e:any){
        console.log(`ERROR OCCURED : ${e.message}`);
        return res.status(500).json({
            err : "INTERNAL SERVER ERROR"
        })
    }

}

// It is POST REQUEST but user is not sending any body
export async function handleShareLinkForMyBrain(req:Request, res:Response){
    try{
        const userId = req.id;
        
        //if share link already exists share that only 
        const alreadyExists = await ShareModel.findOne({
            userId
        })
    
        if(alreadyExists){
            return res.status(200).json({
                message : "share URL fetched successfully",
                alreadyExists
            })
        }
    
        const shareId:string = nanoid(16); 
    
        const linkGenerated  = await ShareModel.create({
            userId,
            shareId,
            shareLink : `${envVars.BASE_URL}/shareId`
        })
    
        return res.status(200).json({
            message : "share URL fetched successfully",
            linkGenerated
        })
    }
    catch(e:any){
        console.log(`SOME ERROR OCCURED : ${e.message}`);
        return res.status(500).json({
            err : "INTERNAL SERVER ERROR"
        })
    }
}

//GET REQUEST
export async function handleGetAnothersBrain(req:Request, res:Response){
    try{
        const brainLink = req.params.shareLink as string;
    
        const checkLinkValidity = await ShareModel.findOne({
            shareId : brainLink 
        }).populate("userId");  
    
        
        if(!checkLinkValidity){
            return res.status(400).json({
                err : "Invalid Brain Link"
            })
        }
    
        // asserting TS that my userId will be populated with UserI interface
        const brainInfo = checkLinkValidity.userId as UserI;
    
        const findBrain = await ContentModel.find({
            userId : checkLinkValidity.userId
        })
    
        return res.status(200).json({
            message : "Someone else's BRAIN fetched !!",
            nameOfPerson : `${brainInfo.firstName}`,  //this error comes because the TS is unable to check duirng compilation if the objectId is populated with the reference content or not [So, using bdVeryStrict very Interfacesare defined]
            emailOfPerson : `${brainInfo.email}`,
            findBrain
        })

    }
    catch(e:any){
        console.log(`ERRORS OCCURED : ${e.message}`)
        return res.status(500).json({
            err : "INTERNAL SERVER ERROR"
        })
    }
}
