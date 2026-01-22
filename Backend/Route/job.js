import dotenv from "dotenv";
dotenv.config();
import {  Router } from "express";
import AIAnalysis from "../Model/Analysis.js";
import { Adzunajob } from "../config/adzuna.js";
import middleware from "../Middleware/Middleware.js";
import OpenAI from "openai";
import filterjobs from '../logics/filterjobs.js'
import skillMap from "../Skillsfetch.js";

const route = Router();

  const client = new OpenAI({
           apiKey: process.env.GROQ_API_KEY,
           baseURL: "https://api.groq.com/openai/v1",
         });

route.get("/jobs", middleware, async (req, res) => {
  try {
   
    const userId = req.userId;

   
    const analysis = await AIAnalysis
      .findOne({ userId })
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
    let airesponse=null;
    const allowedjobs=Object.keys(skillMap)
    for (const job of jobs) {
     const jobText = `${job.title} ${job.description || ""}`;
    
     
     const response=await client.chat.completions.create(
      {
       model:"llama-3.3-70b-versatile",
       messages:[
        {
          role:"system",
          content:"You are a strict technical skill classifier"
        },
         {
          role:"user",
          content:`You need to say what are the skills need for this job title and job description and Return in json only
          rules:
           1. Use ONLY skills from the allowed list
           Use ONLY skills from the allowed list.
          ALLOWED SKILLS:
         ${allowedjobs.join(", ")}
          i will give u clarify like skills are like "html,css,js,react this are like skills" roles are "frontenddeveloper,webdeveloper'etc so anlayize according to the skills matched roles but i need skills matched
           2. Ignore company profile, domain, product, mission
          1.Extract the given reqiurement skills in the Job description that is present in ${allowedjobs.join(',')} for a particular role and only skills and frameworks not company names or others most important or fimilar like 

          2.Any u also say required skills for this job role
          
          jobtitle:${job.title},
          jobdescription:${jobText}
          `

         }
       ]
      }
    )
        airesponse = response.choices[0].message.content;
        break;
 
    }
    
    
   const filteredjobs=await filterjobs(jobs,analysis.experienceLevel);
    return res.json({
      success: true,
      airesponse,
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
