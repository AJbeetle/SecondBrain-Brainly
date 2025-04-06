import mongoose from "mongoose"
import envVars from "./config"
import app from "./index"

async function dbConnect():Promise<void>{
    try{
        // console.log(envVars.DB_USER);
        // console.log(envVars.DB_PASS);
        // console.log(envVars.DB);
        await mongoose.connect(`mongodb+srv://${envVars.DB_USER}:${envVars.DB_PASS}@cluster0.ocvtxz0.mongodb.net/${envVars.DB}`);

        console.log("DATABASE CONNECTED :)");

        app.listen(envVars.PORT,()=>{
            console.log(`Server Listening on port ${envVars.PORT}`)
        })
    }
    catch(e:any){
        console.log("ERROR : ",e.message);
        process.exit(1);
    }

}

export default dbConnect;