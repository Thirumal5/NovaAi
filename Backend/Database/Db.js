import mongoose from "mongoose";

const ConnectDb=async()=>{

    try{
       await mongoose.connect(process.env.MONGO_URL);
         
       console.log("Db is connected Successfully")
    }
    catch(err)
    {
        console.log("Db is not Connected",err.message);
    }
}
export default ConnectDb;