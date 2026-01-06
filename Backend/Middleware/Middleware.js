import User from "../Model/User.js";
import jwt from 'jsonwebtoken'

const middleware= async (req,res,next)=>{
    try{
      const authHeader=req.headers.authorization;

      if(!authHeader)
      {
        return res.status(401).json({success:false,message:"unathorized"})
      }

      const token=authHeader.split(" ")[1];
      if(!token)
      {
          return res.status(401).json({ success: false, message: "Unauthorized" });
      }
        const decoded = jwt.verify(token, "secertKeyNovaAi123");
        
        const user= await User.findById(decoded.id);
         if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
       }
       req.userId=user._id
       next()
      }
      catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
    
}
export default middleware;