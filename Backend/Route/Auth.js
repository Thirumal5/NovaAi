import { Router } from "express";
import User from "../Model/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import middleware from "../Middleware/Middleware.js";
const router=Router()

router.post('/signup',async(req,res)=>
{    const{name,email,password,phonenumber}=req.body;
   
     try{
      if (!name ||!email||!password||!phonenumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
        const user= await User.findOne({email})
        if(user)
        {
          return res.status(400).json({success:false,message:"Email is already Registered"})
        }
        const user1= await User.findOne({phonenumber})
        if(user1)
        {
          return res.status(400).json({success:false,message:"phonenumber Registered"})
        }
        const hashpassword= await bcrypt.hash(password,10);

        const newUser=await User.create(
            {
              name,
              email,
              password:hashpassword,
              phonenumber
            }
        )
        const token=jwt.sign(
          {id:newUser._id},
          "secertKeyNovaAi123",
          {expiresIn:"5h"}
          
       
        )
       
        return res.status(200).json({success:true,token,user:{
          id:newUser.id,
          name:newUser.name,
          email:newUser.email,
          phonenumber:newUser.phonenumber

        }})

   }
   catch(err)
   {
      console.log(err);
       return res.status(500).json({success:false,message:err.message})
   }
}
)
router.post('/signin',async(req,res)=>{
     
  try{
     const{email,password}=req.body;
     const user=await User.findOne({email});
     if(!email||!password)
     {
       return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
     }
    if(!user)
        {
          return res.status(401).json({success:false,message:"user does not exists"})
        }
     const userpassword=await bcrypt.compare(password,user.password);
     if(!userpassword)
     {
      return res.status(401).json({success:false,message:"Wrong Password"});
     }
      const token=jwt.sign(
        {id:user._id},
        "secertKeyNovaAi123",
        {expiresIn: "5h" }
      )
     return res.status(200).json({success:true,token,user:{id:user._id,
      name:user.name,
      email:user.email
    },message:"Login Sucessfull"
  })
  }
  catch(err)
  {
     console.log(err);
     return res.status(500).json({success:false,message:"Error in Login"})
  }
})
router.get('/me',middleware,async(req,res)=>{

    try {
    return res.status(200).json({ success: true ,user:req.user});
  } catch (err) {
    return res.status(500).json({ success: false, message: "Verification failed" });
  }
})
export default router;