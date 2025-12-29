import { Router } from "express";
import AIAnalysis from "../Model/Analysis.js";

const route=Router()


route.get('/latestAnalysis',async(req,res)=>{
   
    try{
       const analysis=await AIAnalysis.findOne({userId:"demoUser"}).sort({createdAt:-1});
       
       if(!analysis)
       {
        return res.status(404).json({success:false})
       }
       return res.status(200).json({success:true,data:analysis})
    }
    catch(err)
    {
        res.status(500).json({ success: false ,message:err.message})
    }


})
export default route;