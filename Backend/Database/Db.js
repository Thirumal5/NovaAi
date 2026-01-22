import mongoose from "mongoose";

const ConnectDb=async()=>{

    try{
       await mongoose.connect("mongodb://localhost:27017/NovaAi");
         
       console.log("Db is connected Successfully")
    }
    catch(err)
    {
        console.log("Db is not Connected",err.message);
    }
}
export default ConnectDb;