import mongoose from "mongoose";

const ConnectDb=async()=>{

    try{
       await mongoose.connect("mongodb+srv://Thiru:thiru2004@carrerloopai.jwn4amx.mongodb.net/NovaAi");
         
       console.log("Db is connected Successfully")
    }
    catch(err)
    {
        console.log("Db is not Connected",err.message);
    }
}
export default ConnectDb;