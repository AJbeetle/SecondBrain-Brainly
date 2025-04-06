import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";  //creates issue so using any for req, res and next function [so to tackle this issue, we created a types folder and in that we have type declaration file for Request interface of Express speciying it might have optional id key]

interface decodedDataType extends JwtPayload{
    id:string,
    authorized:string
}

 
function auth(req:Request, res:Response, next:NextFunction,secret:string){
    // write logic for userAuthentication
    try{
        // console.log(req.cookies?.AuthCookie);
        const Cook:string|undefined = req.cookies?.AuthCookie;
        if(Cook){
            const token:string = Cook.split(" ")[1];
            if(token.length>0){
                // const decodedData = jwt.verify(token,userSecret) as decodedDataType;
                const decodedData = jwt.verify(token,secret) as decodedDataType;
                req.id = decodedData.id;
                req.authorized = decodedData.authorized; 
                return next();

            }
            else{
                return res.status(400).json({
                    err : "Your AuthCookie is empty"
                })
            }
        }
        else{
            return res.status(404).json({
                err : "Please Login to use our services"
            })
        }

    }
    catch(er){
        return res.status(403).json({
            err : "invalid token"
        })
    }

}

export default auth;