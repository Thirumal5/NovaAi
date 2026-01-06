import multer from "multer";
import { Router } from "express";
import mammoth from "mammoth";
import OpenAI from "openai";
import Analysis from "../Model/Analysis.js";

const route = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  }
})
route.post("/resumeAnalyzer", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const { value } = await mammoth.extractRawText({
      buffer: req.file.buffer,
    });

    if (!value || value.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Could not extract text from resume",
      });
    }

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

Return JSON in this exact format:

Return format:
{
  "experienceLevel": "",
  "skills": {}, 
  "matchedRoles": [],
  "strengths": [],
  "missingSkills": [],
  "improvementPlans": [],
  "overallScore": 0
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