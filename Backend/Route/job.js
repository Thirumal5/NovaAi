import { Router } from "express"
import AIAnalysis from "../Model/Analysis.js"
import { Adzunajob } from "../config/adzuna.js"

const route = Router()

route.get("/jobs", async (req, res) => {
  try {
    const { userId } = req.query

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required"
      })
    }

    const analysis = await AIAnalysis
      .findOne({ userId })
      .sort({ createdAt: -1 })

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "No analysis found"
      })
    }

    const role =
      Array.isArray(analysis.matchedRoles) &&
      analysis.matchedRoles.length > 0 &&
      analysis.matchedRoles[0].roles
        ? analysis.matchedRoles[0].roles
        : "software developer"

    const jobs = await Adzunajob({ role })

    return res.json({
      success: true,
      jobs
    })

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: "Job fetch failed"
    })
  }
})

export default route
