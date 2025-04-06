import mongoose from "mongoose"
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {type:String, unique:true, required:true},
    email : {type:String, unique:true, required:true},
    password : {type:String, required:true},
    firstName : {type:String, required:true},
    middleName : {type:String},
    lastName : {type:String}
})

const adminSchema = new Schema({
    username : {type:String, unique:true, required:true},
    email : {type:String, unique:true, required:true},
    password : {type:String, required:true},
    firstName : {type:String, required:true},
    middleName : {type:String},
    lastName : {type:String},
})

// Content that user enters in Brainly App can be : links, pdfs, images, texts, tweet, insta_post, fb_post, assuming anything for now : so, backend will store links in the database and its type, then when frontenf will get the information about it, they can have extracted a preview of that link according to frontend logic

const contentSchema = new Schema({
    userId : {type:Schema.Types.ObjectId, ref:"users", required:true },
    title : {type:String, required:true},
    link : {type:String, required:true},
    type : {type:String, required:true},
    tags: {type:[String], default:[]}
})

const tagSchema = new Schema({
    tagName:{type:String, required:true},

})

const shareSchema = new Schema({
    userId : {type:Schema.Types.ObjectId, ref:"users",required:true},
    shareId : {type:String, required:true},
    shareLink : {type:String, required:true}
})


const UserModel = mongoose.model("users",userSchema);
const AdminModel = mongoose.model("admins",adminSchema);
const ContentModel = mongoose.model("contents",contentSchema);
const ShareModel = mongoose.model("shareLinks",shareSchema);
const TagModel = mongoose.model("tags",tagSchema);

export default {
    UserModel,
    AdminModel,
    ContentModel,
    ShareModel,
    TagModel
}


// tags array :-
/* 
tag : [ "education", "life", "password"]

{
    "title" : "Hey this is new",
    "link" : "www.google.com",
    "tags" : []

}
 */
