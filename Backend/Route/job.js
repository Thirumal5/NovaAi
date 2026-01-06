import { Router } from "express";
import AIAnalysis from "../Model/Analysis.js";
import { Adzunajob } from "../config/adzuna.js";
import middleware from "../Middleware/Middleware.js";

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

  
    let role = "software developer";

    if (
      Array.isArray(analysis.matchedRoles) &&
      analysis.matchedRoles.length > 0
    ) {
      role = analysis.matchedRoles[0]; 
    }

   
    const jobs = await Adzunajob({ role });

    return res.json({
      success: true,
      role,
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
