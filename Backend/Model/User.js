import mongoose from "mongoose";

const UserSchema=new mongoose.Schema(
    {
      name:{
         type:String,
         required:true,
      }
      ,
      email:{
        type:String,
        required:true,
        unique:true,
      },
      targetrole:{
       type:String,
        required:true,
      },
      experience:{
       type:String,
       required:true,

      },
      password:{
        type:String,
        required:true,
         select: false
      }
      ,
      phonenumber:{
          type:String,
          required:true,
          unique:true,
      }
    }
)
const User=mongoose.model("User",UserSchema);
export default User;