import multer from "multer"
import { Router } from "express"
import mammoth from "mammoth"
import { getOpenAI } from "../config/openAi.js"
import AIAnalysis from "../Model/Analysis.js"
const route = Router()

const uploadfile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
})

route.post("/resumeanalyzer", uploadfile.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file received" })
    }

    const result = await mammoth.extractRawText({
      buffer: req.file.buffer
    })

    const extractedText = result.value

    const openai = getOpenAI()

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert resume analyzer. Return strict JSON only."
        },
        {
          role: "user",
          content: `
Analyze the resume and return ONLY valid JSON.

Rules:
- Scores must be between 0 and 10
- No explanations
- No markdown

Return JSON:
{
  "overallScore": number,
  "skills": { "skill": number },
  "recommendedPrimaryRole": string,
  "matchedRoles":[
  {
    "roles":string,
    "matchscore":number
  }
  ],
   "missingSkills": {
    "highPriority": [],
    "mediumPriority": [],
    "lowPriority": []
  },
  "strengths": [],
  "improvementPlan": []
}

Resume:
${extractedText}
`
        }
      ]
    })

    const raw = aiResponse.choices[0].message.content
    const jsonString = raw.replace(/```json|```/g, "").trim()
    const analysis = JSON.parse(jsonString)
     const skills=Object.keys(analysis.skills)
     const missingskills=[
          ...analysis.missingSkills.highPriority,
          ...analysis.missingSkills.mediumPriority,
          ...analysis.missingSkills.lowPriority
     ]
    const analysisDb=await AIAnalysis.create(
        {
            userId:req.user?.id|| "demoUser",
            skills:skills,
            strengths:analysis.strengths,
            improvementPlan:analysis.improvementPlan,
            missingSkills:missingskills,
            overallScore:analysis.overallScore
        }
    )

    return res.status(200).json({ success: true, data:analysis})

  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: false,
      message: "Resume analysis failed"
    })
  }
})

export default route
