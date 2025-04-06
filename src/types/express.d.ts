import {Reqeuest} from "express"
declare global{
    namespace Express{
        interface Request{
            id?:string,
            authorized?:string
        }
    }
}