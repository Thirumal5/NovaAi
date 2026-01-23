import { Router } from "express";
import User from "../Model/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import middleware from "../Middleware/Middleware.js";
import Analysis from "../Model/Analysis.js";
const router=Router()

router.post('/signup',async(req,res)=>
{    const{name,email,targetrole,experience,phonenumber,password}=req.body;
   
     try{
      if (!name ||!email||!password||!phonenumber||!targetrole||!experience) {
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
              phonenumber,
              targetrole, 
              experience
            }
        )
        const token=jwt.sign(
          {id:newUser._id},
          "secertKeyNovaAi123",
          {expiresIn:"8h"}
          
       
        )
       
        return res.status(201).json({success:true,token,user:{
          id: newUser._id,
          name:newUser.name,
          email:newUser.email,
          phonenumber:newUser.phonenumber,
          targetrole:newUser.targetrole,
          experience:newUser.experience

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
      
     if(!email||!password)
     {
       return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
     }
     const user = await User.findOne({ email }).select("+password");
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
      
     return res.status(200).json({success:true,token,message:"Login Sucessfull"})
  }
  catch(err)
  {
     console.log(err);
     return res.status(500).json({success:false,message:"Error in Login"})
  }
})
router.get('/me', middleware, async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      userId: req.user._id 
    });

    return res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        targetrole: req.user.targetrole,
        matchScore: analysis ? analysis.overallScore : 0
      }
    });
  } catch (err) {
    console.error("ME ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Verification failed"
    });
  }
});

export default router;