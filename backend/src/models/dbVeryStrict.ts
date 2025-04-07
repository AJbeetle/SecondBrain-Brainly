import mongoose, {Document, Schema, Model} from "mongoose"
// const Schema = mongoose.Schema;

export interface UserI extends Document{
    username:string,
    email:string,
    password:string,
    firstName:string,
    middleName?:string,
    lastName?:string
}

interface ContentI extends Document{
    userId:Schema.Types.ObjectId | UserI,  //reference to userModel
    // userId:Schema.Types.ObjectId  
    title:string,
    link:string,
    type:string,
    tags?:string[]
}

interface ShareI extends Document{
    userId: Schema.Types.ObjectId | UserI,  //reference to userModel
    // userId: Schema.Types.ObjectId  
    shareId: string,
    shareLink: string
}

interface TagI extends Document{
    tagName:string
}


const userSchema = new Schema<UserI>({
    username : {type:String, unique:true, required:true},
    email : {type:String, unique:true, required:true},
    password : {type:String, required:true},
    firstName : {type:String, required:true},
    middleName : {type:String},
    lastName : {type:String}
})

const adminSchema = new Schema<UserI>({
    username : {type:String, unique:true, required:true},
    email : {type:String, unique:true, required:true},
    password : {type:String, required:true},
    firstName : {type:String, required:true},
    middleName : {type:String},
    lastName : {type:String},
})

// Content that user enters in Brainly App can be : links, pdfs, images, texts, tweet, insta_post, fb_post, assuming anything for now : so, backend will store links in the database and its type, then when frontenf will get the information about it, they can have extracted a preview of that link according to frontend logic

const contentSchema = new Schema<ContentI>({
    userId : {type:Schema.Types.ObjectId, ref:"users", required:true },
    title : {type:String, required:true},
    link : {type:String, required:true},
    type : {type:String, required:true},
    tags : {type:[String]},
})

const tagSchema = new Schema<TagI>({
    tagName:{type:String, required:true},

})

const shareSchema = new Schema<ShareI>({
    userId : {type:Schema.Types.ObjectId, ref:"users",required:true},
    shareId : {type:String, required:true},
    shareLink : {type:String, required:true}
})


const UserModel :Model<UserI> = mongoose.model("users",userSchema);
const AdminModel :Model<UserI>= mongoose.model("admins",adminSchema);
const ContentModel :Model<ContentI> = mongoose.model("contents",contentSchema);
const ShareModel :Model<ShareI>= mongoose.model("shareLinks",shareSchema);
const TagModel :Model<TagI>= mongoose.model("tags",tagSchema);

export default {
    UserModel,
    AdminModel,
    ContentModel,
    ShareModel,
    TagModel
}
