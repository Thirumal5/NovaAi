import multer from "multer";
import { Router } from "express";
import mammoth from "mammoth";
import OpenAI from "openai";
import Analysis from "../Model/Analysis.js";
import middleware from "../Middleware/Middleware.js";

const route = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  }
})
function newskills(skills)
{
  const sanitizedskills={}
  for(const key in skills)
  {
    const safekey=key.replace(/\./g,"_");
    sanitizedskills[safekey]=skills[key];

  }
  return sanitizedskills;
}
route.post("/resumeAnalyzer",middleware,upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }
  let resumeText = "";

 
  const { value } = await mammoth.extractRawText({
    buffer: req.file.buffer,
  });
  resumeText = value;

    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert resume analyzer. Return ONLY valid JSON with no additional text or markdown formatting.",
        },
        {
          role: "user",
          content: `Analyze the resume and return ONLY valid JSON.
Do not add explanations, text, or markdown.

Rules:
- Extract ONLY skills that are clearly present in the resume
- skills must be an OBJECT (key = skill name, value = score between 0 and 1)
- Score reflects proficiency based on experience, projects, and usage
- overallScore must be between 0 and 10
-nearby location cities for jobs  only cities not state give must 3 cities or 4 cities
- always return missing skills related to this role or skills or next skills to learn after this
-always return Areas to improveplans related to this role or skills or next skills to learn or very less score to improve the skills
-return the experience level according to experience level correctly 
Return JSON in this exact format:

Return format:
{
  "experienceLevel": "",
  "skills": {}, 
  "matchedRoles": [],
  "strengths": [],
  "missingSkills": [],
  "improvementPlans": [],
  "overallScore": 0,
  "location":[]
}
Resume text:
${value}`,
        },
      ],
      
    });

    const aiText = response.choices[0].message.content
      .replace(/```json|```/g, "")
      .trim();

    let analysis;

    try {
      analysis = JSON.parse(aiText);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response",
        raw: aiText,
      });
    }
    
  await Analysis.findOneAndUpdate(
  { userId: req.userId },
  {
    resumeText: resumeText,
    experienceLevel: analysis.experienceLevel,
    skills: newskills(analysis.skills),
    matchedRoles: analysis.matchedRoles,
    strengths: analysis.strengths,
    improvementPlans: analysis.improvementPlans,
    missingSkills: analysis.missingSkills,
    location: analysis.location,
    overallScore: analysis.overallScore,
  },
  { upsert: true, new: true }
);


  res.status(200).json({
      success: true,
      analysis,
    });
  } catch (err) {
    console.error("Resume analysis error:", err);

    if (err.message && err.message.includes("file")) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Resume analysis failed",
    });
  }
});

export default route;