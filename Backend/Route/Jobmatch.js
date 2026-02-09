import { Router } from "express";
import Analysis from "../Model/Analysis.js";
import Studyplan from "../Model/studyplan.js";
import Job from "../Model/jobs.js";
import middleware from "../Middleware/Middleware.js";

const route = Router();

route.get("/jobmatched", middleware, async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      userId: req.userId,
    });

    const studyplan = await Studyplan.findOne({
      userId: req.userId,
    });
    const totalJobs = await Job.countDocuments({
      userId: req.userId,
    });
    const jobs = await Job.find({
  userId: req.userId,
  companyname: { $ne: "unknown" },
}).sort({ createdAt: -1 }).limit(12);


    res.json({
      success: true,
      jobs,
      score: analysis?.overallScore || 0,
      totaljobs:totalJobs,
      studyplan: studyplan?.totalDays || 0,
    });

  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch jobs",
    });
  }
});

export default route;
