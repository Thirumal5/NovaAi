import { Router } from "express";
import AIAnalysis from "../Model/Analysis.js";
import { Adzunajob } from "../config/adzuna.js";
import middleware from "../Middleware/Middleware.js";
import { getMatchPercentage } from "./JobMatch.js";

const route = Router();

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
    const allJobs = [];

    for (const role of roles) {
      const jobs = await Adzunajob({ role });
      allJobs.push(...jobs);
    }

   
    const uniqueJobsMap = new Map();

    for (const job of allJobs) {
      const key = job.id || job.redirect_url;

      if (!uniqueJobsMap.has(key)) {
        uniqueJobsMap.set(key, job);
      }
    }

   
    const jobs = Array.from(uniqueJobsMap.values());

    
    for (const job of jobs) {
      const jobText = `${job.title || ""} ${job.description || ""}`;

      const matchPercentage = getMatchPercentage(
        analysis.skills,
        jobText
      );

      job.matchPercentage = matchPercentage;
    }

   
    return res.json({
      success: true,
      roles,
      totalJobs: jobs.length,
      jobs
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
