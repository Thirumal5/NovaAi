import { Router } from "express";
import middleware from "../Middleware/Middleware.js";
import Job from "../Model/jobs.js";

const route=Router()

route.get('/jobs',middleware,async(req,res)=>{

    try{
    const jobs=await Job.find({userId:req.userId}).sort({created:-1})
    res.json({
        success:true,
        jobs
    })

    }
    catch(err)
    {
      res.status(500).json({
        success:false,
        message:"failed to fetch the jobs"
      })
    }
})
export default route;