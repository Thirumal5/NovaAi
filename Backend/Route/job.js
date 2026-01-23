import dotenv from "dotenv";
dotenv.config();
import {  Router } from "express";
import AIAnalysis from "../Model/Analysis.js";
import { Adzunajob } from "../config/adzuna.js";
import middleware from "../Middleware/Middleware.js";
import OpenAI from "openai";
import filterjobs from '../logics/filterjobs.js'
import User from "../Model/User.js";
const route = Router();

  

route.get("/jobs", middleware, async (req, res) => {
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
    const normaliziedskills = Object.keys(analysis.skills || {}).map(
      skill =>
        skill
          .toLowerCase()
          .replace(/_/g, " ")
          .replace("js", "")
          .replace("css", "")
          .trim()
    );
   
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
    return res.json({
      success: true,
       jobs:filteredjobs
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


