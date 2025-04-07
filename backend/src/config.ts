import dotenv from "dotenv";

// console.log(process.cwd());
dotenv.config({
    path : "./.env"
})


//using fallback values for the environment variables
/* enum Envirnoment {
    port = PORT,
    JWT_USER = process.env.JWT_USER || "defaulJWTUserSecret",
    JWT_ADMIN =  process.env.JWT_ADMIN || "defaulJWTAdminSecret",
    DB = process.env.DB || "defaultDB",
    DB_USER = process.env.DB_USER || "defaultDBUsername",
    DB_PASSWORD = process.env.DB_PASS || "defaultDBPassword",
} */

/* no matter what you do fallback check or type assetion you cannot set keep env variables inside enums as TS compiler checks for the values in compile time but these variables exist in runtime

The issue occurs because TypeScript expects the enum members to be evaluated at compile time. When you try to use process.env.PORT (which is a runtime value) in the enum declaration, TypeScript can’t infer the correct value due to the way enums work in TypeScript.

Specifically, in TypeScript, enum members must have their values computed at compile-time, but process.env.PORT is not available until runtime, so it can't be directly used in a computed enum like you're trying to do. */

//using fallback values for the environment variables [we can also use type assetion]


const envVars:Record<string,string> = {
    PORT : process.env.PORT || "3000",
    JWT_USER : process.env.JWT_USER || "defaultJWTUserSecret",
    JWT_ADMIN : process.env.JWT_ADMIN || "defaultJWTAdminSecret",
    DB : process.env.DB || "defaultDB",
    DB_USER : process.env.DB_USER || "defaultDBUsername",
    DB_PASS : process.env.DB_PASS || "defaultDBPassword",    
    BASE_URL : process.env.BASE_URL || "http://localhost:8000"
}


//using type assertion to tell TS env variables will not be undefined
// enum Environment {
//     PORT = process.env.PORT as string,
//     JWT_USER = process.env.JWT_USER as string,
//     JWT_ADMIN = process.env.JWT_ADMIN as string ,
//     DB = process.env.DB as string,
//     DB_USER = process.env.DB_USER as string,
//     DB_PASSWORD = process.env.DB_PASS as string,
// }

// console.log("PORT:",process.env.PORT);
// console.log("PORT:",typeof(process.env.PORT));

export default envVars;