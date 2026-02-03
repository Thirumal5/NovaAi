import dotenv from "dotenv";
import Job from "../Model/jobs.js";
dotenv.config();
import {  Router } from "express";
import AIAnalysis from "../Model/Analysis.js";
import { Adzunajob } from "../config/adzuna.js";
import middleware from "../Middleware/Middleware.js";

import filterjobs from '../logics/filterjobs.js'
import User from "../Model/User.js";
const route = Router();

  

route.post("/", middleware, async (req, res) => {
  try {
   
   

   
   const analysis = await AIAnalysis
  .findOne({ userId: req.userId })
  .sort({ createdAt: -1 });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "No resume analysis found"
      });
    }

  
    const roles = analysis.matchedRoles || [];
    const locations=analysis.location ||[];
    const allJobs = [];

    for (const role of roles) {
      for(const location of locations)
      {
      const jobs = await Adzunajob({ role,location });
      allJobs.push(...jobs);
      }
      
    }

   
    const uniqueJobsMap = new Map();

    for (const job of allJobs) {
      const key = job.id || job.redirect_url;

      if (!uniqueJobsMap.has(key)) {
        uniqueJobsMap.set(key, job);
      }
    }
    
   
    const jobs = Array.from(uniqueJobsMap.values());


   const user=await User.findById(req.userId).select("experience")
   if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found"
  });
}
    const userexperience=user.experience
   const filteredjobs=filterjobs(jobs,userexperience);

   
   let totaljobs=0;
   for(const job of filteredjobs)
   {
    const exists=await Job.findOne({userId:req.userId,jobId:job.id})

    if(exists)
      continue;
    await Job.create(
      {
        userId:req.userId,
        jobId:job.id,
        title:job.title,
        companyname:job.company?.display_name||"unknown",
        location:job.location?.display_name||"Unknown",
        applyurl:job.redirect_url||job.adref,
        skills:job.category?.label ? [job.category.label] : [],
        description:job.description,
        experienceLevel: user.experience,
           salary:
          job.salary_min && job.salary_max
            ? `${job.salary_min}-${job.salary_max}`
            : "Not disclosed",
        source: "Adzuna",
      }
    )
    totaljobs++;
   }
    return res.json({
      success: true,
       jobs:filteredjobs,
       jobscount:totaljobs
    });

  } catch (err) {
    console.error("Job fetch error:", err);
    return res.status(500).json({
      success: false,
      message: "Job fetch failed"
    });
  }
});

export default route;